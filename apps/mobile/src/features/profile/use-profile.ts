import { useCallback, useEffect, useState } from 'react';

import { supabase } from '@/lib/supabase';

/** Ligne de `public.profiles` (sous-ensemble utilisé par l'en-tête de profil). */
type ProfileRow = {
  first_name: string | null;
  last_name: string | null;
};

export type RiderProfile = {
  /** Identifiant de l'utilisateur courant (null si pas de session). */
  userId: string | null;
  /** Nom complet « prénom nom », ou null si profil vide / invité. */
  fullName: string | null;
  /** Email de la session, si disponible. */
  email: string | null;
  /** Session anonyme Supabase (`user.is_anonymous`). */
  isAnonymous: boolean;
};

/**
 * Récupère l'utilisateur courant (`supabase.auth.getUser()`) et son profil
 * applicatif (`public.profiles`). Détermine prénom/nom, email et statut anonyme.
 */
export function useProfile() {
  const [profile, setProfile] = useState<RiderProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    // Pas de session → getUser() renvoie une erreur "Auth session missing" et user null :
    // on traite ce cas comme un invité, pas comme une erreur.
    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user ?? null;
    if (!user) {
      setProfile({ userId: null, fullName: null, email: null, isAnonymous: true });
      setLoading(false);
      return;
    }

    const isAnonymous = user.is_anonymous === true;

    // On ne charge le profil applicatif que pour un compte non anonyme.
    let fullName: string | null = null;
    if (!isAnonymous) {
      const { data: row, error: profileError } = await supabase
        .from('profiles')
        .select('first_name, last_name')
        .eq('id', user.id)
        .maybeSingle();
      if (profileError) {
        setError(profileError.message);
        setProfile(null);
        setLoading(false);
        return;
      }
      const typed = row as ProfileRow | null;
      const parts = [typed?.first_name, typed?.last_name].filter((p): p is string => !!p && p.trim() !== '');
      fullName = parts.length > 0 ? parts.join(' ') : null;
    }

    setProfile({
      userId: user.id,
      fullName,
      email: user.email ?? null,
      isAnonymous,
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return { profile, loading, error, reload: load };
}
