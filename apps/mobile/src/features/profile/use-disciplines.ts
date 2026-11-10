import { useCallback, useEffect, useState } from 'react';

import { supabase } from '@/lib/supabase';

/** Label multilingue stocké en JSONB sur `public.disciplines`. */
export type DisciplineLabel = { fr: string; en: string; es: string };

/** Catégories de disciplines (colonne `category`). */
export type DisciplineCategory = 'moto' | 'velo' | 'eau' | 'snow' | 'urban';

/** Ligne de la table `public.disciplines`. */
export type Discipline = {
  id: string;
  slug: string;
  label: DisciplineLabel;
  category: DisciplineCategory;
};

/** Plafond de disciplines sélectionnables par rider (imposé aussi par trigger serveur). */
export const MAX_DISCIPLINES = 5;

/** Ordre d'affichage des sections + titres FR. */
export const CATEGORY_ORDER: DisciplineCategory[] = ['moto', 'velo', 'eau', 'snow', 'urban'];

export const CATEGORY_LABEL: Record<DisciplineCategory, string> = {
  moto: 'Moto',
  velo: 'Vélo',
  eau: 'Eau',
  snow: 'Snow',
  urban: 'Urbain',
};

/** Une section = une catégorie et ses disciplines. */
export type DisciplineSection = {
  category: DisciplineCategory;
  title: string;
  items: Discipline[];
};

/**
 * Charge le référentiel des disciplines depuis `public.disciplines`, groupé par
 * catégorie dans l'ordre d'affichage. Expose aussi la liste à plat.
 */
export function useDisciplines() {
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: queryError } = await supabase
      .from('disciplines')
      .select('id, slug, label, category');
    if (queryError) {
      setError(queryError.message);
      setDisciplines([]);
    } else {
      setDisciplines((data as Discipline[] | null) ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  // Groupe par catégorie, en respectant CATEGORY_ORDER et en ignorant les sections vides.
  const sections: DisciplineSection[] = CATEGORY_ORDER.map((category) => ({
    category,
    title: CATEGORY_LABEL[category],
    items: disciplines.filter((d) => d.category === category),
  })).filter((section) => section.items.length > 0);

  return { disciplines, sections, loading, error, reload: load };
}
