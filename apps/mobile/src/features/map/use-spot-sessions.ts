import { useCallback, useEffect, useState } from 'react';

import { supabase } from '@/lib/supabase';

export type SpotSummary = {
  id: string;
  name: string;
  category: 'private' | 'public';
  primaryDiscipline: string | null;
  isFree: boolean;
};

export type SpotSession = {
  id: string;
  startsAt: string;
  note: string | null;
  participantCount: number;
  joined: boolean;
};

type SpotDisciplineRow = { is_primary: boolean; disciplines: { slug: string } | null };
type SessionRow = {
  id: string;
  starts_at: string;
  note: string | null;
  session_participants: { rider_id: string }[] | null;
};

/** Charge le résumé d'un spot et ses sessions à venir, avec jointure des participants. */
export function useSpotSessions(spotId: string) {
  const [spot, setSpot] = useState<SpotSummary | null>(null);
  const [sessions, setSessions] = useState<SpotSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [me, setMe] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { data: userData } = await supabase.auth.getUser();
    const uid = userData?.user?.id ?? null;
    setMe(uid);

    const { data: spotRow, error: spotErr } = await supabase
      .from('spots')
      .select('id, name, category, payment_url, spot_disciplines(is_primary, disciplines(slug))')
      .eq('id', spotId)
      .single();
    if (spotErr || !spotRow) {
      setError(spotErr?.message ?? 'Spot introuvable');
      setLoading(false);
      return;
    }

    // Supabase infère la relation imbriquée comme un tableau ; à l'exécution `disciplines`
    // est un objet (FK to-one). On passe par unknown pour aligner le type.
    const sd = (spotRow.spot_disciplines ?? []) as unknown as SpotDisciplineRow[];
    const primary = sd.length ? (sd.find((x) => x.is_primary) ?? sd[0]).disciplines?.slug ?? null : null;
    setSpot({
      id: spotRow.id as string,
      name: spotRow.name as string,
      category: spotRow.category as 'private' | 'public',
      primaryDiscipline: primary,
      isFree: spotRow.payment_url == null,
    });

    const { data: sess, error: sessErr } = await supabase
      .from('sessions')
      .select('id, starts_at, note, session_participants(rider_id)')
      .eq('spot_id', spotId)
      .eq('status', 'active')
      .order('starts_at', { ascending: true });
    if (sessErr) {
      setError(sessErr.message);
      setLoading(false);
      return;
    }

    setSessions(
      ((sess ?? []) as SessionRow[]).map((row) => {
        const parts = row.session_participants ?? [];
        return {
          id: row.id,
          startsAt: row.starts_at,
          note: row.note,
          participantCount: parts.length,
          joined: uid ? parts.some((p) => p.rider_id === uid) : false,
        };
      }),
    );
    setLoading(false);
  }, [spotId]);

  useEffect(() => {
    void load();
  }, [load]);

  const join = async (sessionId: string) => {
    if (!me) return;
    setSessions((prev) =>
      prev.map((s) => (s.id === sessionId ? { ...s, joined: true, participantCount: s.participantCount + 1 } : s)),
    );
    const { error: joinErr } = await supabase.from('session_participants').insert({ session_id: sessionId, rider_id: me });
    if (joinErr) void load(); // rollback via refetch
  };

  const leave = async (sessionId: string) => {
    if (!me) return;
    setSessions((prev) =>
      prev.map((s) =>
        s.id === sessionId ? { ...s, joined: false, participantCount: Math.max(0, s.participantCount - 1) } : s,
      ),
    );
    const { error: leaveErr } = await supabase
      .from('session_participants')
      .delete()
      .eq('session_id', sessionId)
      .eq('rider_id', me);
    if (leaveErr) void load();
  };

  return { spot, sessions, loading, error, me, join, leave, reload: load };
}
