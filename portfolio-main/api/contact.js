// POST /api/contact
//
// Server-side endpoint for the contact form. Runs as a Vercel Node.js
// serverless function (zero-config — Vercel picks up anything under /api
// automatically for any frontend framework, including a Vite SPA).
//
// The Resend API key NEVER reaches the browser: it's read from
// process.env here, on the server, and the client only ever talks to
// this same-origin endpoint.
//
// Required environment variables (set in Vercel → Project → Settings →
// Environment Variables, and locally in a .env file — see .env.example):
//   RESEND_API_KEY   — your Resend secret API key
//   RESEND_TO_EMAIL  — the inbox that should receive submissions
//   RESEND_FROM_EMAIL — a sender address on a domain verified in Resend
//                        (e.g. "Portfolio <contact@yourdomain.com>").
//                        Resend will reject sends from unverified domains.
//
// Optional environment variables (persists every submission to Supabase
// as a durable backup/lead-log in addition to the email — see
// /supabase/schema.sql for the table definition and
// api/lib/supabaseAdmin.js for the client):
//   SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY

import { getSupabaseAdmin } from './lib/supabaseAdmin.js';

const MAX_LENGTHS = { name: 100, email: 100, subject: 150, message: 2000 };

// Best-effort in-memory rate limit. Serverless instances are ephemeral and
// may run concurrently, so this is a soft speed bump (pairs with the
// honeypot field below) rather than a hard guarantee — for stronger
// protection, put this behind a WAF/rate-limiting layer (e.g. Vercel
// Firewall) at the edge.
const submissionsByIp = new Map();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 3;

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = (submissionsByIp.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  submissionsByIp.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

function sanitize(value) {
  return String(value ?? '')
    .replace(/[<>]/g, '')
    .trim();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip =
    (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown';

  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please try again in a minute.' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  const { name, email, subject, message, company } = body;

  // Honeypot: a hidden field ("company") that real users never fill in.
  // Bots that auto-fill every field will trip this and get a silent 200
  // so they don't learn to look for a different signal.
  if (company) {
    return res.status(200).json({ ok: true });
  }

  const errors = {};
  const cleanName = sanitize(name);
  const cleanEmail = sanitize(email);
  const cleanSubject = sanitize(subject);
  const cleanMessage = sanitize(message);

  if (!cleanName) errors.name = 'Name is required';
  else if (cleanName.length > MAX_LENGTHS.name) errors.name = `Name must be under ${MAX_LENGTHS.name} characters`;

  if (!cleanEmail) errors.email = 'Email is required';
  else if (!isValidEmail(cleanEmail)) errors.email = 'Invalid email format';
  else if (cleanEmail.length > MAX_LENGTHS.email) errors.email = `Email must be under ${MAX_LENGTHS.email} characters`;

  if (!cleanSubject) errors.subject = 'Subject is required';
  else if (cleanSubject.length > MAX_LENGTHS.subject) errors.subject = `Subject must be under ${MAX_LENGTHS.subject} characters`;

  if (!cleanMessage) errors.message = 'Message is required';
  else if (cleanMessage.length > MAX_LENGTHS.message) errors.message = `Message must be under ${MAX_LENGTHS.message} characters`;

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ error: 'Validation failed', fieldErrors: errors });
  }

  const { RESEND_API_KEY, RESEND_TO_EMAIL, RESEND_FROM_EMAIL } = process.env;

  if (!RESEND_API_KEY || !RESEND_TO_EMAIL || !RESEND_FROM_EMAIL) {
    // Log details server-side only — the client never sees why it failed.
    console.error('Contact form: missing Resend environment variables.');
    return res.status(500).json({ error: 'Server is not configured to send messages right now.' });
  }

  // Persist a durable record in Supabase before attempting delivery, so a
  // lead is never lost even if the Resend send fails downstream. This is
  // strictly best-effort: Supabase is optional (getSupabaseAdmin() is
  // `null` until SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are set) and a
  // DB failure here must never block or fail the user-facing request —
  // email delivery remains the source of truth for success/failure.
  let submissionId = null;
  const supabase = getSupabaseAdmin();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .insert({
          name: cleanName,
          email: cleanEmail,
          subject: cleanSubject,
          message: cleanMessage,
          ip_address: ip,
          status: 'pending',
        })
        .select('id')
        .single();

      if (error) throw error;
      submissionId = data?.id ?? null;
    } catch (err) {
      console.error('Supabase insert failed (continuing with email send):', err);
    }
  }

  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: RESEND_FROM_EMAIL,
        to: [RESEND_TO_EMAIL],
        reply_to: cleanEmail,
        subject: `[Portfolio] ${cleanSubject}`,
        html: `
          <div style="font-family: sans-serif; line-height: 1.6;">
            <p><strong>From:</strong> ${escapeHtml(cleanName)} (${escapeHtml(cleanEmail)})</p>
            <p><strong>Subject:</strong> ${escapeHtml(cleanSubject)}</p>
            <p><strong>Message:</strong></p>
            <p>${escapeHtml(cleanMessage).replace(/\n/g, '<br />')}</p>
          </div>
        `,
      }),
    });

    if (!resendResponse.ok) {
      const errorBody = await resendResponse.text();
      console.error('Resend API error:', resendResponse.status, errorBody);
      await markSubmission(supabase, submissionId, 'failed');
      return res.status(502).json({ error: 'Could not send your message right now. Please try again shortly.' });
    }

    await markSubmission(supabase, submissionId, 'sent');
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact form send failed:', err);
    await markSubmission(supabase, submissionId, 'failed');
    return res.status(500).json({ error: 'Something went wrong. Please try again shortly.' });
  }
}

// Best-effort status update — never throws, never affects the response
// already being sent back to the client.
async function markSubmission(supabase, submissionId, status) {
  if (!supabase || !submissionId) return;
  try {
    await supabase.from('contact_submissions').update({ status }).eq('id', submissionId);
  } catch (err) {
    console.error('Supabase status update failed:', err);
  }
}
