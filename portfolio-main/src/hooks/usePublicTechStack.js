import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

/**
 * Tech stack is two related tables (tech_categories, tech_items), so it
 * doesn't fit the single-table usePublicTable hook. Groups items under
 * their category and falls back to the static list — same rules as
 * usePublicTable: unconfigured, empty, or errored → fallback.
 */
export function usePublicTechStack(fallbackData) {
  const [categories, setCategories] = useState(fallbackData);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [usingFallback, setUsingFallback] = useState(!isSupabaseConfigured);

  useEffect(() => {
    let cancelled = false;

    if (!isSupabaseConfigured) {
      setCategories(fallbackData);
      setUsingFallback(true);
      setLoading(false);
      return undefined;
    }

    setLoading(true);

    Promise.all([
      supabase.from('tech_categories').select('*').order('sort_order', { ascending: true }),
      supabase.from('tech_items').select('*').order('sort_order', { ascending: true }),
    ]).then(([catRes, itemRes]) => {
      if (cancelled) return;

      const cats = catRes.data;
      const items = itemRes.data;

      if (catRes.error || itemRes.error || !cats || cats.length === 0) {
        setCategories(fallbackData);
        setUsingFallback(true);
        setLoading(false);
        return;
      }

      const grouped = cats.map((cat) => ({
        id: cat.id,
        title: cat.title,
        items: (items || [])
          .filter((item) => item.category_id === cat.id)
          .map((item) => ({ name: item.name, brand: item.brand_slug || null })),
      }));

      setCategories(grouped);
      setUsingFallback(false);
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { categories, loading, usingFallback };
}
