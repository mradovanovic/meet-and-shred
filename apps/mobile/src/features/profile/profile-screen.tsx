import { FontAwesome6 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/button';
import { disciplineColor } from '@/features/map/discipline-color';
import { supabase } from '@/lib/supabase';
import { Colors, FontFamily, Radius, Spacing } from '@/theme/tokens';
import { MAX_DISCIPLINES, useDisciplines, type Discipline } from './use-disciplines';
import { useProfile } from './use-profile';
import { useRiderDisciplines } from './use-rider-disciplines';

export default function ProfileScreen() {
  const router = useRouter();
  const { profile, loading: profileLoading, error: profileError, reload: reloadProfile } = useProfile();
  const {
    sections,
    loading: disciplinesLoading,
    error: disciplinesError,
    reload: reloadDisciplines,
  } = useDisciplines();
  const {
    selectedIds,
    toggle,
    atLimit,
    error: riderError,
  } = useRiderDisciplines(profile?.userId ?? null);

  const [signingOut, setSigningOut] = useState(false);

  const signOut = async () => {
    setSigningOut(true);
    try {
      await supabase.auth.signOut();
      router.replace('/');
    } catch {
      // En cas d'échec réseau, on redirige quand même : la session locale est effacée.
      router.replace('/');
    }
  };

  // ── État de chargement global (en-tête) ──
  if (profileLoading) {
    return (
      <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
        <View style={styles.centered}>
          <ActivityIndicator color={Colors.accent} />
        </View>
      </SafeAreaView>
    );
  }

  // ── Erreur de chargement du profil ──
  if (profileError) {
    return (
      <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
        <View style={styles.centered}>
          <FontAwesome6 name="triangle-exclamation" size={28} color={Colors.danger} />
          <Text style={styles.errorTitle}>Impossible de charger ton profil</Text>
          <Text style={styles.errorDetail}>{profileError}</Text>
          <Button variant="secondary" onPress={reloadProfile}>
            Réessayer
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  const displayName = profile?.fullName ?? 'Invité';
  const selectedCount = selectedIds.size;

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.body}>
        {/* ── En-tête profil ── */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <FontAwesome6 name="user-large" size={28} color={Colors.textMuted} />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.name}>{displayName}</Text>
            {profile?.email ? <Text style={styles.email}>{profile.email}</Text> : null}
          </View>
        </View>

        {/* ── Sélecteur de disciplines ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Mes disciplines</Text>
            <Text style={styles.sectionCount}>
              {selectedCount}/{MAX_DISCIPLINES}
            </Text>
          </View>

          {atLimit ? <Text style={styles.limitNote}>{MAX_DISCIPLINES} maximum</Text> : null}
          {riderError ? <Text style={styles.inlineError}>{riderError}</Text> : null}

          {disciplinesLoading ? (
            <View style={styles.inlineLoader}>
              <ActivityIndicator color={Colors.accent} />
            </View>
          ) : disciplinesError ? (
            <View style={styles.inlineErrorBlock}>
              <Text style={styles.errorDetail}>{disciplinesError}</Text>
              <Button variant="secondary" onPress={reloadDisciplines}>
                Réessayer
              </Button>
            </View>
          ) : sections.length === 0 ? (
            <Text style={styles.emptyText}>Aucune discipline disponible pour le moment.</Text>
          ) : (
            sections.map((group) => (
              <View key={group.category} style={styles.disciplineGroup}>
                <Text style={styles.groupTitle}>{group.title}</Text>
                <View style={styles.chips}>
                  {group.items.map((discipline) => {
                    const selected = selectedIds.has(discipline.id);
                    // Désactive les chips non sélectionnées quand le plafond est atteint.
                    const disabled = !selected && atLimit;
                    return (
                      <DisciplineChip
                        key={discipline.id}
                        discipline={discipline}
                        selected={selected}
                        disabled={disabled}
                        onPress={() => toggle(discipline.id)}
                      />
                    );
                  })}
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* ── Déconnexion ── */}
      <View style={styles.footer}>
        <Button
          variant="ghost"
          disabled={signingOut}
          icon={<FontAwesome6 name="right-from-bracket" size={16} color={Colors.textMuted} />}
          onPress={signOut}
        >
          {signingOut ? 'Déconnexion…' : 'Se déconnecter'}
        </Button>
      </View>
    </SafeAreaView>
  );
}

/** Chip (toggle) d'une discipline, colorée par catégorie. */
function DisciplineChip({
  discipline,
  selected,
  disabled,
  onPress,
}: {
  discipline: Discipline;
  selected: boolean;
  disabled: boolean;
  onPress: () => void;
}) {
  const color = disciplineColor(discipline.slug);
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected, disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        selected && { backgroundColor: color, borderColor: color },
        !selected && { borderColor: color },
        disabled && styles.chipDisabled,
        pressed && !disabled && { opacity: 0.85 },
      ]}
    >
      {selected ? <FontAwesome6 name="check" size={12} color={Colors.white} /> : null}
      <Text style={[styles.chipLabel, selected ? styles.chipLabelOn : { color }]}>{discipline.label.fr}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: Spacing.md, paddingHorizontal: Spacing.xl },

  body: { padding: Spacing.xl, gap: Spacing.xxl },

  // En-tête
  header: { flexDirection: 'row', alignItems: 'center', gap: Spacing.lg },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: Radius.pill,
    backgroundColor: Colors.surfaceCard,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: { flex: 1, gap: Spacing.xs },
  name: { color: Colors.text, fontSize: 24, fontFamily: FontFamily.black },
  email: { color: Colors.textMuted, fontSize: 14, fontFamily: FontFamily.regular },

  // Section
  section: { gap: Spacing.md },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sectionTitle: { color: Colors.text, fontSize: 18, fontFamily: FontFamily.medium },
  sectionCount: { color: Colors.textMuted, fontSize: 14, fontFamily: FontFamily.medium },
  limitNote: { color: Colors.textSecondary, fontSize: 13, fontFamily: FontFamily.regular },
  inlineError: { color: Colors.danger, fontSize: 13, fontFamily: FontFamily.regular },

  disciplineGroup: { gap: Spacing.sm, marginTop: Spacing.sm },
  groupTitle: {
    color: Colors.textSecondary,
    fontSize: 13,
    fontFamily: FontFamily.medium,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.pill,
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  chipDisabled: { opacity: 0.35 },
  chipLabel: { fontSize: 14, fontFamily: FontFamily.medium },
  chipLabelOn: { color: Colors.white },

  // États divers
  inlineLoader: { paddingVertical: Spacing.xl, alignItems: 'center' },
  inlineErrorBlock: { gap: Spacing.md, paddingVertical: Spacing.md },
  emptyText: { color: Colors.textMuted, fontSize: 14, fontFamily: FontFamily.regular, paddingVertical: Spacing.md },
  errorTitle: { color: Colors.text, fontSize: 18, fontFamily: FontFamily.medium, textAlign: 'center' },
  errorDetail: { color: Colors.textMuted, fontSize: 14, fontFamily: FontFamily.regular, textAlign: 'center' },

  // Footer
  footer: { padding: Spacing.xl, paddingTop: Spacing.md, borderTopWidth: 1, borderTopColor: Colors.border },
});
