import { useCallback, useEffect, useRef, useState } from 'react';

import { supabase } from '@/lib/supabase';
import type { ProfileLite } from './types';

/** Longueur minimale de la requête avant de lancer une recherche. */
const MIN_QUERY_LENGTH = 2;
/** Délai de debounce (ms) pour éviter une requête à chaque frappe. */
const DEBOUNCE_MS = 300;

/**
 * Recherche de riders par prénom OU nom (`public.profiles`), pour démarrer une
 * conversation. Exclut l'utilisateur courant. Debounce + garde contre les
 * réponses obsolètes (course entre requêtes successives).
 */
export function useRiderSearch(query: string) {
  const [results, setResults] = useState<ProfileLite[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Jeton incrémental : on ignore les réponses d'une requête périmée.
  const requestSeq = useRef(0);

  const run = useCallback(async (q: string) => {
    const trimmed = q.trim();
    const seq = ++requestSeq.current;

    if (trimmed.length < MIN_QUERY_LENGTH) {
      setResults([]);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    const { data: userData } = await supabase.auth.getUser();
    const me = userData?.user?.id ?? null;

    // Recherche sur prénom OU nom (insensible à la casse).
    const pattern = `%${trimmed}%`;
    const { data, error: queryError } = await supabase
      .from('profiles')
      .select('id, first_name, last_name')
      .or(`first_name.ilike.${pattern},last_name.ilike.${pattern}`)
      .limit(20);

    // Réponse périmée : une requête plus récente a été lancée entre-temps.
    if (seq !== requestSeq.current) return;

    if (queryError) {
      setError(queryError.message);
      setResults([]);
      setLoading(false);
      return;
    }

    const rows = (data as ProfileLite[] | null) ?? [];
    // On exclut soi-même des résultats.
    setResults(me ? rows.filter((r) => r.id !== me) : rows);
    setLoading(false);
  }, []);

  useEffect(() => {
    const handle = setTimeout(() => {
      void run(query);
    }, DEBOUNCE_MS);
    return () => clearTimeout(handle);
  }, [query, run]);

  return { results, loading, error };
}
