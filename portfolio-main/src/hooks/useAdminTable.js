import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

/**
 * Full CRUD against a single CMS table, for use inside /admin manager
 * screens only. Assumes `supabase` is configured — every route that
 * uses this hook sits behind <ProtectedRoute>, which already requires
 * a live Supabase session to be reached at all.
 */
export function useAdminTable(table, { orderBy = 'sort_order', idField = 'id' } = {}) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { data, error: err } = await supabase
      .from(table)
      .select('*')
      .order(orderBy, { ascending: true });

    if (err) setError(err.message);
    setRows(data ?? []);
    setLoading(false);
  }, [table, orderBy]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const create = useCallback(
    async (row) => {
      const { error: err } = await supabase.from(table).insert(row);
      if (err) return { error: err.message };
      await refresh();
      return { error: null };
    },
    [table, refresh]
  );

  const update = useCallback(
    async (id, patch) => {
      const { error: err } = await supabase.from(table).update(patch).eq(idField, id);
      if (err) return { error: err.message };
      await refresh();
      return { error: null };
    },
    [table, idField, refresh]
  );

  const remove = useCallback(
    async (id) => {
      const { error: err } = await supabase.from(table).delete().eq(idField, id);
      if (err) return { error: err.message };
      await refresh();
      return { error: null };
    },
    [table, idField, refresh]
  );

  return { rows, loading, error, refresh, create, update, remove };
}

/**
 * CRUD for the singleton about_content row — just an update, since the
 * row is seeded by supabase/schema_cms.sql and never created/deleted
 * from the UI.
 */
export function useAdminSingleton(table) {
  const [row, setRow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { data, error: err } = await supabase.from(table).select('*').eq('id', 1).maybeSingle();

    if (err) setError(err.message);
    setRow(data ?? null);
    setLoading(false);
  }, [table]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const save = useCallback(
    async (patch) => {
      const { error: err } = await supabase.from(table).update(patch).eq('id', 1);
      if (err) return { error: err.message };
      await refresh();
      return { error: null };
    },
    [table, refresh]
  );

  return { row, loading, error, refresh, save };
}
