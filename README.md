# Madhava Prasad — Portfolio

Personal portfolio site for Madhava Prasad (Software Engineer, AI Agent Developer,
Full Stack Developer), built with React + Vite.

## Features

- Interactive particle background (ts-particles) that reacts to cursor movement
- Dark / light theme toggle with `localStorage` persistence and system-preference detection
- Animated splash loader (M monogram draw → fill → progress → name)
- Sections: Hero, About, Tech Stack, Projects, Experience, Education, Certifications, Contact
- Custom animated cursor (magnetic hover snap + velocity-based squash/stretch),
  automatically disabled on touch devices and when `prefers-reduced-motion` is set
- Contact form → Vercel serverless function (`/api/contact`) → sends via
  **Resend** and optionally logs every submission to **Supabase**
  (`contact_submissions` table) as a durable backup — no email address exposed client-side
- Google Analytics 4 + Vercel Web Analytics (optional, env-gated)
- **Content Management System** at `/admin` — edit Projects, About, Tech Stack,
  Experience, Education, and Certifications from a signed-in dashboard; the
  public site updates live, no redeploy needed. See "Content Management
  System" below.

## Content Management System

Every section on the site (Projects, About, Tech Stack, Experience,
Education, Certifications) is editable from **`/admin`** — a password-
protected dashboard backed by Supabase (Postgres + Auth).

**If Supabase isn't configured, the site keeps working exactly as before** —
every section falls back to its built-in static content
(`src/data/*.js`), and `/admin` shows a "not configured" message instead
of a login form. Nothing breaks; the CMS is a strict addition.

### One-time setup

1. **Create a Supabase project** at [supabase.com](https://supabase.com) →
   "New project" (free tier is enough). This can be the same project
   already used for the contact form's backup log, or a new one.
2. **Run the schema.** Project → SQL Editor → New query → paste the full
   contents of `supabase/schema_cms.sql` → Run. This creates the content
   tables and locks them down with Row Level Security (public can read,
   only a signed-in user can write).
3. **Create your admin user.** Project → Authentication → Users → Add user
   → enter an email and password. This is the *only* account that will
   ever be able to sign in — there's no public sign-up screen anywhere in
   the app, by design.
4. **Get your API keys.** Project → Settings → API → copy the **Project
   URL** and the **anon public key** (not the service role key — that one
   stays server-side, used only by the contact form).
5. **Set environment variables** (locally in `.env`, and in Vercel →
   Project → Settings → Environment Variables for production):
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
6. **Sign in.** Visit `/admin/login` and sign in with the user you created
   in step 3. From the dashboard you can edit every section; changes are
   live on the public site immediately.

### How it works

- The public site reads content client-side with the **anon key** — Row
  Level Security (see `supabase/schema_cms.sql`) grants it SELECT only,
  nothing else.
- `/admin` writes also go through the same anon key, but RLS only allows
  INSERT/UPDATE/DELETE from a request carrying a valid, signed-in session
  — so the actual security boundary is Supabase Auth + RLS, not anything
  in the client bundle (which is always inspectable on a static site).
- Each section reads through a small hook (`usePublicTable` /
  `usePublicSingleton` / `usePublicTechStack` in `src/hooks/`) that falls
  back to the matching static file in `src/data/` whenever Supabase isn't
  configured, a table is empty, or a request fails — so a typo in an env
  var degrades gracefully instead of blanking a section.
- Tech Stack is two related tables — `tech_categories` (the column
  headings: Languages, Frontend, Backend, …) and `tech_items` (one row per
  technology, rendered as a line under its category). Add/edit categories
  and items from `/admin/tech-stack`.

## Setup

```bash
npm install
cp .env.example .env   # fill in Resend + (optional) Supabase / GA4 / CMS keys
npm run dev
```

## Build

```bash
npm run build
npm run preview   # sanity-check the production build locally
```

## Before deploying

See `DEPLOYMENT_CHECKLIST.md` for the full walkthrough (Resend domain
verification, Supabase schema + keys, Vercel env vars, smoke test). Short version:

- Fill in `.env` with real **Resend** credentials (`RESEND_API_KEY`,
  `RESEND_TO_EMAIL`, `RESEND_FROM_EMAIL`) — the contact API returns a 500
  without them.
- Optionally run `supabase/schema.sql` in a Supabase project and set
  `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` to persist every submission to a DB.
- Update the canonical/OG URLs in `index.html` and `public/sitemap.xml` /
  `public/robots.txt` to your real deployed domain (currently placeholders).
