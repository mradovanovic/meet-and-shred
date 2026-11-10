import { useCallback, useEffect, useState } from 'react';

import { supabase } from '@/lib/supabase';
import { MAX_DISCIPLINES } from './use-disciplines';

/** Ligne de `public.rider_disciplines`. */
type RiderDisciplineRow = {
  discipline_id: string;
};

/**
 * Gère les disciplines pratiquées par le rider courant (`public.rider_disciplines`).
 * - charge les sélections existantes
 * - toggle avec sauvegarde immédiate (insert/delete) et mise à jour optimiste
 * - rollback visuel si l'appel serveur échoue
 */
export function useRiderDisciplines(riderId: string | null) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Évite les appels concurrents sur une même discipline (double-tap).
  const [savingIds, setSavingIds] = useState<Set<string>>(new Set());

  const load = useCallback(async () => {
    if (!riderId) {
      setSelectedIds(new Set());
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    const { data, error: queryError } = await supabase
      .from('rider_disciplines')
      .select('discipline_id')
      .eq('rider_id', riderId);
    if (queryError) {
      setError(queryError.message);
      setSelectedIds(new Set());
    } else {
      const rows = (data as RiderDisciplineRow[] | null) ?? [];
      setSelectedIds(new Set(rows.map((r) => r.discipline_id)));
    }
    setLoading(false);
  }, [riderId]);

  useEffect(() => {
    void load();
  }, [load]);

  const atLimit = selectedIds.size >= MAX_DISCIPLINES;

  const toggle = useCallback(
    async (disciplineId: string) => {
      if (!riderId) return;
      if (savingIds.has(disciplineId)) return;

      const isSelected = selectedIds.has(disciplineId);

      // Blocage côté UI du plafond (le serveur l'impose aussi via trigger).
      if (!isSelected && atLimit) {
        setError(`${MAX_DISCIPLINES} maximum`);
        return;
      }

      setError(null);
      setSavingIds((prev) => new Set(prev).add(disciplineId));

      // Mise à jour optimiste.
      setSelectedIds((prev) => {
        const next = new Set(prev);
        if (isSelected) next.delete(disciplineId);
        else next.add(disciplineId);
        return next;
      });

      const { error: mutationError } = isSelected
        ? await supabase
            .from('rider_disciplines')
            .delete()
            .eq('rider_id', riderId)
            .eq('discipline_id', disciplineId)
        : await supabase.from('rider_disciplines').insert({ rider_id: riderId, discipline_id: disciplineId });

      if (mutationError) {
        // Rollback visuel : on remet l'état d'avant le toggle.
        setSelectedIds((prev) => {
          const next = new Set(prev);
          if (isSelected) next.add(disciplineId);
          else next.delete(disciplineId);
          return next;
        });
        setError(mutationError.message);
      }

      setSavingIds((prev) => {
        const next = new Set(prev);
        next.delete(disciplineId);
        return next;
      });
    },
    [riderId, selectedIds, savingIds, atLimit],
  );

  return { selectedIds, toggle, atLimit, loading, error, reload: load };
}
