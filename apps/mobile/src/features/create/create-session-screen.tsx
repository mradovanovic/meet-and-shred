import { FontAwesome6 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { Colors, FontFamily, Radius, Spacing } from '@/theme/tokens';
import { buildTimePresets } from './time-presets';
import { useSpotsList, type SpotOption } from './use-spots-list';

/**
 * Écran « Créer une session » — un rider organise une sortie de ride rattachée
 * à un spot existant, que d'autres riders pourront rejoindre.
 */
export default function CreateSessionScreen() {
  const router = useRouter();
  const { spots, loading: spotsLoading, error: spotsError, reload: reloadSpots } = useSpotsList();

  // Presets d'horaire figés au montage de l'écran (pas de recalcul à chaque rendu).
  const timePresets = useMemo(() => buildTimePresets(), []);

  const [spotId, setSpotId] = useState<string | null>(null);
  const [presetKey, setPresetKey] = useState<string | null>(null);
  const [note, setNote] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [created, setCreated] = useState(false);

  const selectedPreset = timePresets.find((p) => p.key === presetKey) ?? null;
  const canSubmit = spotId !== null && selectedPreset !== null && !submitting;

  const createSession = async () => {
    if (!spotId || !selectedPreset) return;
    setSubmitting(true);
    setSubmitError(null);

    // L'utilisateur courant devient le créateur de la session.
    const { data: userData } = await supabase.auth.getUser();
    const creatorId = userData.user?.id;
    if (!creatorId) {
      setSubmitError('Tu dois être connecté pour créer une session.');
      setSubmitting(false);
      return;
    }

    const trimmedNote = note.trim();
    const { error: insertError } = await supabase.from('sessions').insert({
      spot_id: spotId,
      creator_id: creatorId,
      starts_at: selectedPreset.date.toISOString(),
      note: trimmedNote.length > 0 ? trimmedNote : null,
      status: 'active',
    });

    if (insertError) {
      setSubmitError(insertError.message);
      setSubmitting(false);
      return;
    }

    setSubmitting(false);
    setCreated(true);
  };

  // ── Écran de confirmation après création ──
  if (created) {
    return (
      <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
        <View style={styles.centered}>
          <View style={styles.successIcon}>
            <FontAwesome6 name="circle-check" size={40} color={Colors.lagoon} />
          </View>
          <Text style={styles.successTitle}>Session créée !</Text>
          <Text style={styles.successDetail}>Ta crew peut maintenant te rejoindre sur le spot.</Text>
          <View style={styles.successActions}>
            <Button
              variant="primary"
              icon={<FontAwesome6 name="map-location-dot" size={16} color={Colors.white} />}
              onPress={() => router.replace('/map')}
            >
              Voir sur la carte
            </Button>
            <Button variant="ghost" onPress={() => router.back()}>
              Retour
            </Button>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.screenTitle}>Créer une session</Text>
        <Text style={styles.screenSubtitle}>Organise une sortie et laisse d&apos;autres riders te rejoindre.</Text>

        {/* ── 1. Choix du spot ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Où ça ride ?</Text>

          {spotsLoading ? (
            <View style={styles.inlineLoader}>
              <ActivityIndicator color={Colors.accent} />
            </View>
          ) : spotsError ? (
            <View style={styles.inlineErrorBlock}>
              <Text style={styles.errorDetail}>{spotsError}</Text>
              <Button variant="secondary" onPress={reloadSpots}>
                Réessayer
              </Button>
            </View>
          ) : spots.length === 0 ? (
            <Text style={styles.emptyText}>Aucun spot disponible pour le moment.</Text>
          ) : (
            <View style={styles.spotList}>
              {spots.map((spot) => (
                <SpotRow
                  key={spot.id}
                  spot={spot}
                  selected={spot.id === spotId}
                  onPress={() => setSpotId(spot.id)}
                />
              ))}
            </View>
          )}
        </View>

        {/* ── 2. Horaire de début ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quand ?</Text>
          <View style={styles.chips}>
            {timePresets.map((preset) => {
              const selected = preset.key === presetKey;
              return (
                <Pressable
                  key={preset.key}
                  accessibilityRole="button"
                  accessibilityState={{ selected }}
                  onPress={() => setPresetKey(preset.key)}
                  style={({ pressed }) => [
                    styles.chip,
                    selected && styles.chipOn,
                    pressed && { opacity: 0.85 },
                  ]}
                >
                  {selected ? <FontAwesome6 name="check" size={12} color={Colors.white} /> : null}
                  <Text style={[styles.chipLabel, selected && styles.chipLabelOn]}>{preset.label}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* ── 3. Note optionnelle ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Un mot pour ta crew ?</Text>
          <TextInput
            style={styles.noteInput}
            value={note}
            onChangeText={setNote}
            placeholder="Optionnel — niveau, matos, point de rendez-vous…"
            placeholderTextColor={Colors.textMuted}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {submitError ? <Text style={styles.inlineError}>{submitError}</Text> : null}
      </ScrollView>

      {/* ── Action de création ── */}
      <View style={styles.footer}>
        <Button
          variant="primary"
          disabled={!canSubmit}
          icon={<FontAwesome6 name="flag-checkered" size={16} color={canSubmit ? Colors.white : Colors.textMuted} />}
          onPress={createSession}
        >
          {submitting ? 'Création…' : 'Créer la session'}
        </Button>
      </View>
    </SafeAreaView>
  );
}

/** Ligne (sélectionnable) d'un spot dans le sélecteur. */
function SpotRow({ spot, selected, onPress }: { spot: SpotOption; selected: boolean; onPress: () => void }) {
  // Libellé lisible de la catégorie du spot.
  const categoryLabel = spot.category === 'private' ? 'Privé' : spot.category === 'public' ? 'Public' : null;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [styles.spotRow, selected && styles.spotRowOn, pressed && { opacity: 0.85 }]}
    >
      <FontAwesome6
        name="location-dot"
        size={16}
        color={selected ? Colors.accent : Colors.textMuted}
        style={styles.spotIcon}
      />
      <View style={styles.spotText}>
        <Text style={styles.spotName}>{spot.name}</Text>
        {categoryLabel ? <Text style={styles.spotCategory}>{categoryLabel}</Text> : null}
      </View>
      {selected ? <FontAwesome6 name="circle-check" size={18} color={Colors.accent} /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: Spacing.md, paddingHorizontal: Spacing.xl },

  body: { padding: Spacing.xl, gap: Spacing.xxl },

  screenTitle: { color: Colors.text, fontSize: 28, fontFamily: FontFamily.black },
  screenSubtitle: { color: Colors.textMuted, fontSize: 15, fontFamily: FontFamily.regular, lineHeight: 22, marginTop: -Spacing.md },

  // Sections
  section: { gap: Spacing.md },
  sectionTitle: { color: Colors.text, fontSize: 18, fontFamily: FontFamily.medium },

  // Sélecteur de spot
  spotList: { gap: Spacing.sm },
  spotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surfaceCard,
  },
  spotRowOn: { borderColor: Colors.accent },
  spotIcon: { width: 20, textAlign: 'center' },
  spotText: { flex: 1, gap: Spacing.xs },
  spotName: { color: Colors.text, fontSize: 16, fontFamily: FontFamily.medium },
  spotCategory: { color: Colors.textMuted, fontSize: 13, fontFamily: FontFamily.regular },

  // Presets d'horaire (chips)
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.pill,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: 'transparent',
  },
  chipOn: { backgroundColor: Colors.accent, borderColor: Colors.accent },
  chipLabel: { color: Colors.textSecondary, fontSize: 14, fontFamily: FontFamily.medium },
  chipLabelOn: { color: Colors.white },

  // Note
  noteInput: {
    minHeight: 96,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surfaceCard,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    color: Colors.text,
    fontSize: 15,
    fontFamily: FontFamily.regular,
  },

  // États divers
  inlineLoader: { paddingVertical: Spacing.xl, alignItems: 'center' },
  inlineErrorBlock: { gap: Spacing.md, paddingVertical: Spacing.md },
  inlineError: { color: Colors.danger, fontSize: 13, fontFamily: FontFamily.regular },
  errorDetail: { color: Colors.textMuted, fontSize: 14, fontFamily: FontFamily.regular },
  emptyText: { color: Colors.textMuted, fontSize: 14, fontFamily: FontFamily.regular, paddingVertical: Spacing.md },

  // Confirmation de création
  successIcon: {
    width: 88,
    height: 88,
    borderRadius: Radius.pill,
    backgroundColor: Colors.surfaceCard,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successTitle: { color: Colors.text, fontSize: 24, fontFamily: FontFamily.black, textAlign: 'center' },
  successDetail: { color: Colors.textMuted, fontSize: 15, fontFamily: FontFamily.regular, textAlign: 'center', lineHeight: 22 },
  successActions: { alignSelf: 'stretch', gap: Spacing.md, marginTop: Spacing.lg },

  // Footer
  footer: { padding: Spacing.xl, paddingTop: Spacing.md, borderTopWidth: 1, borderTopColor: Colors.border },
});
