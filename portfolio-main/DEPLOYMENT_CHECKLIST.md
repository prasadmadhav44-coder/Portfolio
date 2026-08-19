# Deployment Checklist

Everything below has to be true before this ships to a real domain.

---

## 1. Supabase (contact form persistence)

- [ ] Create a project at [supabase.com](https://supabase.com) (free tier is enough).
- [ ] Open **SQL Editor → New query**, paste the contents of `supabase/schema.sql`, click **Run**.
      This creates `contact_submissions` with RLS enabled and no public policies —
      only the service-role key (used server-side only) can read/write it.
- [ ] Copy two values from **Project Settings → API**:
  - `Project URL` → `SUPABASE_URL`
  - `service_role` secret key → `SUPABASE_SERVICE_ROLE_KEY`
      ⚠️ This is a secret key with full DB access. Never prefix it with `VITE_`,
      never commit it, never expose it to the browser.
- [ ] Confirm `@supabase/supabase-js` is in `package.json` → `dependencies` (already added).
- [ ] Optional sanity check after deploying: submit the contact form once, then in
      Supabase **Table Editor → contact_submissions** confirm a row appeared with
      `status = 'sent'`.

If `SUPABASE_URL`/`SUPABASE_SERVICE_ROLE_KEY` are left blank, the contact form still
works end-to-end on Resend alone — the DB write is best-effort and never blocks
or fails the request (see `api/contact.js`).

## 1b. Supabase (Content Management System at /admin)

This is a **separate concern** from section 1 above — same Supabase project is
fine, different tables, different key (anon, not service role).

- [ ] Open **SQL Editor → New query**, paste the contents of
      `supabase/schema_cms.sql`, click **Run**. Creates `about_content`,
      `tech_categories`, `tech_items`, `projects`, `experience`, `education`,
      `certifications` — all with RLS (public read, authenticated write only).
- [ ] **Authentication → Users → Add user** — create the one admin account
      (email + password). There is no public sign-up screen in the app; this
      is the only way to get a login.
- [ ] Copy two values from **Project Settings → API**:
  - `Project URL` → `VITE_SUPABASE_URL`
  - `anon public` key → `VITE_SUPABASE_ANON_KEY`
      (This is safe to expose client-side — RLS is what actually restricts it.
      Do **not** use the service role key here.)
- [ ] Sign in at `/admin/login` and confirm the dashboard loads.
- [ ] Edit one item in each section (Projects, About, Tech Stack, Experience,
      Education, Certifications) and confirm the public page updates on reload.

If `VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY` are left blank, every section
falls back to its built-in static content automatically — the site is never
broken by CMS misconfiguration, and `/admin/login` shows a clear "not
configured" message instead of a broken form.

## 2. Resend (contact form email delivery)

- [ ] Create an account at [resend.com](https://resend.com).
- [ ] **Domains → Add Domain**, add your real domain, add the DNS records
      Resend gives you (SPF/DKIM) at your DNS provider, wait for it to verify.
      Sends from an unverified domain are rejected — this step is not optional.
- [ ] **API Keys → Create API Key** → copy it → `RESEND_API_KEY`.
- [ ] Set `RESEND_FROM_EMAIL` to an address on the now-verified domain, e.g.
      `Portfolio <contact@yourdomain.com>`.
- [ ] Set `RESEND_TO_EMAIL` to the inbox that should actually receive submissions
      (your personal Gmail/Outlook is fine — it only needs to *receive*, not send).
- [ ] Test: submit the live contact form once deployed and confirm the email lands
      (check spam folder on the very first send).

## 3. Environment variables in Vercel

**Project → Settings → Environment Variables**, add for Production (and Preview if
you want PR previews to send real email/DB writes):

| Variable | Required | Notes |
|---|---|---|
| `RESEND_API_KEY` | Yes | secret |
| `RESEND_TO_EMAIL` | Yes | |
| `RESEND_FROM_EMAIL` | Yes | must be on a Resend-verified domain |
| `SUPABASE_URL` | Optional | enables DB persistence (contact form backup) |
| `SUPABASE_SERVICE_ROLE_KEY` | Optional | secret, enables DB persistence (contact form backup) |
| `VITE_SUPABASE_URL` | Optional | enables the CMS at `/admin` |
| `VITE_SUPABASE_ANON_KEY` | Optional | enables the CMS at `/admin` (safe to expose — see §1b) |
| `VITE_GA_MEASUREMENT_ID` | Optional | Google Analytics 4 |

- [ ] All required vars set for **Production**.
- [ ] Redeploy after adding/changing env vars (Vercel doesn't hot-reload functions on env change).

## 4. Licensing

- [ ] The base template carries an "All Rights Reserved" license from its original
      author — confirm permission to deploy publicly before going live, per the
      note already flagged for this project.

## 5. Pre-launch smoke test (after deploying to the real domain)

- [ ] Splash screen plays once, then never replays on scroll/navigation.
- [ ] Desktop navbar: floating pill stays visible at all scroll positions (no disappearing).
- [ ] Mobile: top bar and bottom tab bar both stay visible; name/heading text
      never breaks mid-word at any viewport width (test at 360px, 390px, 414px).
- [ ] Theme toggle persists across reload (`localStorage`).
- [ ] Tech Stack: brand icons render in their own official colors, not the
      accent color; chips wrap correctly on mobile.
- [ ] Custom cursor: only active on fine-pointer/no-reduced-motion devices;
      native cursor shows correctly on mobile/touch.
- [ ] Contact form: submit a real message → email arrives via Resend → row
      appears in Supabase (if configured) with `status = 'sent'`.
- [ ] Contact form: try submitting with an empty field → inline validation errors show, no request sent.
- [ ] `/admin/login` → sign in with the admin user → edit and save an entry in each
      of Projects / About / Tech Stack / Experience / Education / Certifications →
      confirm the public page reflects the change on reload.
- [ ] Load `/admin` directly in a new tab (not via in-app navigation) and confirm
      it doesn't 404 — this exercises the `vercel.json` SPA rewrite.
- [ ] Sign out from `/admin` and confirm `/admin` redirects to `/admin/login`.
- [ ] Resume PDF opens correctly from **View Resume**.
- [ ] All external links (GitHub, LinkedIn, live project demos) open and are correct.
- [ ] Run Lighthouse (Chrome DevTools) on the deployed URL: Performance,
      Accessibility, Best Practices, SEO all ≥ 90.
- [ ] Test keyboard-only navigation (Tab through nav, form, and project cards) —
      focus rings should be visible throughout.
- [ ] Test with `prefers-reduced-motion` enabled in OS settings — animations should
      shorten/disable, page should remain fully usable.

## 6. Post-launch

- [ ] Submit sitemap (`/sitemap.xml`) to Google Search Console.
- [ ] Verify Open Graph image renders correctly when the URL is shared (test in
      Slack/Twitter/LinkedIn link preview or opengraph.xyz).
- [ ] Set up a Vercel deployment notification (email/Slack) so failed deploys aren't silent.
