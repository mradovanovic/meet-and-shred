import { FontAwesome6 } from '@expo/vector-icons';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Colors, FontFamily, Radius, Spacing } from '@/theme/tokens';
import { disciplineColor } from './discipline-color';
import { useSpotSessions, type SpotSession } from './use-spot-sessions';

// Formatte l'horaire d'une session sans dépendance (Aujourd'hui / Demain / JJ/MM + HH:MM).
function formatWhen(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const sameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  let day: string;
  if (sameDay(d, now)) day = "Aujourd'hui";
  else if (sameDay(d, tomorrow)) day = 'Demain';
  else day = `${d.getDate()}/${String(d.getMonth() + 1).padStart(2, '0')}`;
  return `${day} ${hh}:${mm}`;
}

export function SpotSheet({ spotId, onClose }: { spotId: string; onClose: () => void }) {
  const { spot, sessions, loading, error, join, leave } = useSpotSessions(spotId);
  const color = disciplineColor(spot?.primaryDiscipline ?? null);

  return (
    <View style={styles.sheet}>
      <View style={styles.handle} />
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <View style={[styles.dot, { backgroundColor: color }]} />
          <Text style={styles.title} numberOfLines={1}>
            {spot?.name ?? 'Spot'}
          </Text>
        </View>
        <Pressable onPress={onClose} hitSlop={10} accessibilityLabel="Fermer">
          <FontAwesome6 name="xmark" size={20} color={Colors.textMuted} />
        </Pressable>
      </View>

      {spot ? (
        <Text style={styles.meta}>
          {spot.category === 'public' ? 'Spot libre' : 'Spot géré'} · {spot.isFree ? 'Gratuit' : 'Payant'}
        </Text>
      ) : null}

      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator color={Colors.accent} />
        </View>
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : sessions.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Aucune sortie prévue ici.</Text>
          <Text style={styles.emptyHint}>Crée la tienne depuis l&apos;onglet Créer.</Text>
        </View>
      ) : (
        <ScrollView style={styles.list} contentContainerStyle={{ gap: Spacing.md }}>
          <Text style={styles.sectionLabel}>Sorties à venir</Text>
          {sessions.map((s) => (
            <SessionRow key={s.id} session={s} onJoin={() => join(s.id)} onLeave={() => leave(s.id)} />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

function SessionRow({ session, onJoin, onLeave }: { session: SpotSession; onJoin: () => void; onLeave: () => void }) {
  return (
    <View style={styles.row}>
      <View style={styles.rowInfo}>
        <Text style={styles.when}>{formatWhen(session.startsAt)}</Text>
        {session.note ? (
          <Text style={styles.note} numberOfLines={2}>
            {session.note}
          </Text>
        ) : null}
        <Text style={styles.count}>
          <FontAwesome6 name="users" size={11} color={Colors.textMuted} /> {session.participantCount} rider
          {session.participantCount > 1 ? 's' : ''}
        </Text>
      </View>
      <Pressable
        onPress={session.joined ? onLeave : onJoin}
        style={[styles.joinBtn, session.joined ? styles.joinBtnOn : null]}
        accessibilityRole="button"
      >
        <Text style={[styles.joinText, session.joined ? styles.joinTextOn : null]}>
          {session.joined ? 'Quitter' : 'Rejoindre'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    maxHeight: '60%',
    backgroundColor: Colors.surfaceCard,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xxl,
  },
  handle: { alignSelf: 'center', width: 40, height: 4, borderRadius: 999, backgroundColor: Colors.border, marginBottom: Spacing.md },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: Spacing.md },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, flex: 1 },
  dot: { width: 12, height: 12, borderRadius: 6 },
  title: { color: Colors.text, fontSize: 20, fontFamily: FontFamily.black, flex: 1 },
  meta: { color: Colors.textMuted, fontSize: 13, fontFamily: FontFamily.regular, marginTop: Spacing.xs },

  loader: { paddingVertical: Spacing.xl, alignItems: 'center' },
  error: { color: Colors.danger, fontSize: 14, fontFamily: FontFamily.regular, paddingVertical: Spacing.md },
  empty: { paddingVertical: Spacing.xl, gap: Spacing.xs },
  emptyText: { color: Colors.text, fontSize: 15, fontFamily: FontFamily.medium },
  emptyHint: { color: Colors.textMuted, fontSize: 13, fontFamily: FontFamily.regular },

  list: { marginTop: Spacing.lg },
  sectionLabel: { color: Colors.textSecondary, fontSize: 12, fontFamily: FontFamily.medium, textTransform: 'uppercase', letterSpacing: 0.5 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: Spacing.md,
  },
  rowInfo: { flex: 1, gap: 2 },
  when: { color: Colors.text, fontSize: 15, fontFamily: FontFamily.medium },
  note: { color: Colors.textSecondary, fontSize: 13, fontFamily: FontFamily.regular },
  count: { color: Colors.textMuted, fontSize: 12, fontFamily: FontFamily.regular },

  joinBtn: {
    paddingHorizontal: Spacing.lg,
    height: 40,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.accent,
  },
  joinBtnOn: { backgroundColor: Colors.surfaceRaised },
  joinText: { color: Colors.white, fontSize: 14, fontFamily: FontFamily.medium },
  joinTextOn: { color: Colors.textMuted },
});
