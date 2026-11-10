import { useCallback, useEffect, useState } from 'react';

import { supabase } from '@/lib/supabase';

/** Spot sélectionnable dans le formulaire de création de session. */
export type SpotOption = {
  id: string;
  name: string;
  /** 'private' (établissement) ou 'public' (gratuit). */
  category: string | null;
};

/**
 * Charge la liste des spots (`public.spots`) triés par nom, pour le sélecteur
 * de spot de l'écran « Créer une session ». Respecte la RLS Supabase.
 */
export function useSpotsList() {
  const [spots, setSpots] = useState<SpotOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: queryError } = await supabase
      .from('spots')
      .select('id, name, category')
      .order('name');
    if (queryError) {
      setError(queryError.message);
      setSpots([]);
    } else {
      setSpots((data as SpotOption[]) ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return { spots, loading, error, reload: load };
}
