import { useCallback, useEffect, useState } from 'react';

import { supabase } from '@/lib/supabase';
import type { Conversation, DirectMessage, ProfileLite } from './types';

/**
 * Charge tous les messages de l'utilisateur courant et en dérive la liste des
 * conversations (regroupées par correspondant, dernier message en tête).
 *
 * - La RLS ne renvoie que les messages où l'utilisateur est sender ou recipient.
 * - On résout les profils des correspondants en une requête `in`.
 */
export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    // ── Utilisateur courant ──
    const { data: userData } = await supabase.auth.getUser();
    const me = userData?.user?.id ?? null;
    if (!me) {
      // Pas de session : aucune conversation (invité).
      setConversations([]);
      setLoading(false);
      return;
    }

    // ── Messages (triés du plus récent au plus ancien) ──
    const { data, error: queryError } = await supabase
      .from('direct_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (queryError) {
      setError(queryError.message);
      setConversations([]);
      setLoading(false);
      return;
    }

    const messages = (data as DirectMessage[] | null) ?? [];

    // ── Regroupement par « autre participant » ──
    // Les messages étant déjà triés desc., le premier vu par conversation est le dernier message.
    const byOther = new Map<string, DirectMessage>();
    for (const message of messages) {
      const otherUserId = message.sender_id === me ? message.recipient_id : message.sender_id;
      if (!byOther.has(otherUserId)) {
        byOther.set(otherUserId, message);
      }
    }

    const otherIds = [...byOther.keys()];
    if (otherIds.length === 0) {
      setConversations([]);
      setLoading(false);
      return;
    }

    // ── Résolution des profils des correspondants ──
    const { data: profilesData, error: profilesError } = await supabase
      .from('profiles')
      .select('id, first_name, last_name')
      .in('id', otherIds);

    if (profilesError) {
      setError(profilesError.message);
      setConversations([]);
      setLoading(false);
      return;
    }

    const profilesById = new Map<string, ProfileLite>();
    for (const profile of (profilesData as ProfileLite[] | null) ?? []) {
      profilesById.set(profile.id, profile);
    }

    const derived: Conversation[] = otherIds.map((otherUserId) => ({
      otherUserId,
      otherProfile: profilesById.get(otherUserId) ?? null,
      // byOther garantit une valeur pour chaque clé parcourue.
      lastMessage: byOther.get(otherUserId) as DirectMessage,
    }));

    // Déjà ordonné par récence (ordre d'insertion = ordre des messages triés desc.).
    setConversations(derived);
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return { conversations, loading, error, reload: load };
}
