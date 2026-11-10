import { useCallback, useEffect, useState } from 'react';

import { supabase } from '@/lib/supabase';
import type { DirectMessage, ProfileLite } from './types';

/**
 * Gère le fil d'une conversation 1:1 avec `otherUserId` :
 * - identifie l'utilisateur courant (`me`)
 * - charge les messages échangés entre `me` et `otherUserId` (ordre chronologique)
 * - résout le profil du correspondant (en-tête)
 * - expose `send(body)` qui insère un message puis rafraîchit le fil
 */
export function useConversation(otherUserId: string) {
  const [me, setMe] = useState<string | null>(null);
  const [messages, setMessages] = useState<DirectMessage[]>([]);
  const [otherProfile, setOtherProfile] = useState<ProfileLite | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    // ── Utilisateur courant ──
    const { data: userData } = await supabase.auth.getUser();
    const myId = userData?.user?.id ?? null;
    setMe(myId);
    if (!myId) {
      setMessages([]);
      setLoading(false);
      return;
    }

    // ── Messages entre moi et le correspondant (tri chronologique) ──
    const { data, error: queryError } = await supabase
      .from('direct_messages')
      .select('*')
      .or(
        `and(sender_id.eq.${myId},recipient_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},recipient_id.eq.${myId})`,
      )
      .order('created_at', { ascending: true });

    if (queryError) {
      setError(queryError.message);
      setMessages([]);
      setLoading(false);
      return;
    }

    setMessages((data as DirectMessage[] | null) ?? []);

    // ── Profil du correspondant (en-tête) ──
    const { data: profileData } = await supabase
      .from('profiles')
      .select('id, first_name, last_name')
      .eq('id', otherUserId)
      .maybeSingle();
    setOtherProfile((profileData as ProfileLite | null) ?? null);

    setLoading(false);
  }, [otherUserId]);

  useEffect(() => {
    void load();
  }, [load]);

  /**
   * Envoie un message au correspondant puis recharge le fil.
   * Renvoie `true` si l'envoi a réussi (utile pour vider le champ côté UI).
   */
  const send = useCallback(
    async (rawBody: string): Promise<boolean> => {
      const body = rawBody.trim();
      if (!body || !me || sending) return false;

      setSending(true);
      setError(null);
      const { error: insertError } = await supabase.from('direct_messages').insert({
        sender_id: me,
        recipient_id: otherUserId,
        body,
      });

      if (insertError) {
        setError(insertError.message);
        setSending(false);
        return false;
      }

      await load();
      setSending(false);
      return true;
    },
    [me, otherUserId, sending, load],
  );

  return { me, messages, otherProfile, loading, error, sending, send, reload: load };
}
