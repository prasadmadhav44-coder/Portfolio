// Browser-side Supabase client, used by:
//   • the public site, to read CMS content (anon key — RLS restricts it
//     to SELECT only, see supabase/schema_cms.sql)
//   • the /admin panel, to sign in and to read/write CMS content once
//     signed in (still the anon key — RLS grants write access based on
//     the authenticated session, never on a separate secret key)
//
// This is deliberately a different, weaker client than
// api/lib/supabaseAdmin.js, which holds the SERVICE ROLE key and must
// never be imported from src/.
//
// Required environment variables (client-side, so they DO need the
// VITE_ prefix to be bundled):
//   VITE_SUPABASE_URL       → Project Settings → API → Project URL
//   VITE_SUPABASE_ANON_KEY  → Project Settings → API → anon public key
//
// Both are safe to ship to the browser — they only ever grant what RLS
// allows. Leave them blank to run the site purely on its static
// fallback data (see src/hooks/usePublicTable.js) with the admin panel
// disabled.

import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

export const supabase = isSupabaseConfigured
  ? createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;
