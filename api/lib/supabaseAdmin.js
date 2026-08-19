// Server-only Supabase client, built with the SERVICE ROLE key.
//
// This file is only ever imported from files under /api (serverless
// functions that run on Vercel's Node.js runtime) — never from src/,
// which is bundled and shipped to the browser. The service role key
// bypasses Row Level Security, so it must never reach client-side code.
//
// Required environment variables (server-side only, no VITE_ prefix):
//   SUPABASE_URL              — Project Settings → API → Project URL
//   SUPABASE_SERVICE_ROLE_KEY — Project Settings → API → service_role key
//
// getSupabaseAdmin() returns `null` (rather than throwing) when the env
// vars aren't configured yet, so the contact form keeps working purely
// on Resend even before Supabase is wired up — the DB write is treated
// as a best-effort persistence layer, not a hard dependency.

import { createClient } from '@supabase/supabase-js';

let cachedClient = null;

export function getSupabaseAdmin() {
  const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return null;
  }

  if (!cachedClient) {
    cachedClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }

  return cachedClient;
}
