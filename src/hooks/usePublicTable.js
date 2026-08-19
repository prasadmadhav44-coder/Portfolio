import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

/**
 * Reads a CMS table for display on the public site.
 *
 * Falls back to `fallbackData` whenever Supabase isn't configured, the
 * table comes back empty, or the request errors — so the portfolio
 * never breaks or shows an empty section just because the CMS hasn't
 * been populated yet. Once you edit content in /admin, the live rows
 * take over automatically.
 */
export function usePublicTable(table, { orderBy = 'sort_order', fallbackData = [] } = {}) {
  const [data, setData] = useState(fallbackData);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [usingFallback, setUsingFallback] = useState(!isSupabaseConfigured);

  useEffect(() => {
    let cancelled = false;

    if (!isSupabaseConfigured) {
      setData(fallbackData);
      setUsingFallback(true);
      setLoading(false);
      return undefined;
    }

    setLoading(true);

    supabase
      .from(table)
      .select('*')
      .order(orderBy, { ascending: true })
      .then(({ data: rows, error }) => {
        if (cancelled) return;

        if (error || !rows || rows.length === 0) {
          setData(fallbackData);
          setUsingFallback(true);
        } else {
          setData(rows);
          setUsingFallback(false);
        }
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // fallbackData is a stable module-level constant at every call site
    // (see src/data/*.js) — omitting it from deps avoids refetch loops.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table, orderBy]);

  return { data, loading, usingFallback };
}

/**
 * Same idea, but for the singleton `about_content` row (id = 1).
 */
export function usePublicSingleton(table, { fallbackData = null } = {}) {
  const [data, setData] = useState(fallbackData);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [usingFallback, setUsingFallback] = useState(!isSupabaseConfigured);

  useEffect(() => {
    let cancelled = false;

    if (!isSupabaseConfigured) {
      setData(fallbackData);
      setUsingFallback(true);
      setLoading(false);
      return undefined;
    }

    setLoading(true);

    supabase
      .from(table)
      .select('*')
      .eq('id', 1)
      .maybeSingle()
      .then(({ data: row, error }) => {
        if (cancelled) return;

        if (error || !row) {
          setData(fallbackData);
          setUsingFallback(true);
        } else {
          setData(row);
          setUsingFallback(false);
        }
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table]);

  return { data, loading, usingFallback };
}
