import { useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'

export type FetchState<T> = {
  data: T
  loading: boolean
  error: string | null
}

/**
 * Generic content loader used by every public section.
 * - If Supabase isn't configured yet, resolves immediately with the seed data.
 * - Once configured, queries the given table (ordered by `order` if present,
 *   falling back to `created_at`) and maps rows through `mapRow`.
 * - Any query error falls back to seed data so the public site never breaks.
 */
export function useContent<Row, T>(
  table: string,
  seed: T,
  mapRows: (rows: Row[]) => T,
  orderColumn: string = 'created_at'
): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: seed,
    loading: isSupabaseConfigured,
    error: null,
  })

  useEffect(() => {
    let cancelled = false
    if (!supabase) return

    supabase
      .from(table)
      .select('*')
      .order(orderColumn, { ascending: true })
      .then(({ data, error }) => {
        if (cancelled) return
        if (error || !data) {
          setState({ data: seed, loading: false, error: error?.message ?? 'Failed to load' })
          return
        }
        setState({ data: mapRows(data as Row[]), loading: false, error: null })
      })

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table])

  return state
}
