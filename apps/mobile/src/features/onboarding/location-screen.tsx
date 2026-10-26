import { FontAwesome6 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { type ComponentProps } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/button';
import { Colors, FontFamily, Radius, Spacing } from '@/theme/tokens';

type IconName = ComponentProps<typeof FontAwesome6>['name'];

// Écran d'explication géolocalisation (change auth-registration, non bloquant).
const BENEFITS: { icon: IconName; text: string }[] = [
  { icon: 'location-crosshairs', text: 'Vois les spots, events et sessions autour de toi' },
  { icon: 'arrows-to-dot', text: 'Trie par distance, trouve le plus proche' },
  { icon: 'eye-slash', text: "Ta position n'est jamais visible des autres riders" },
];

export default function LocationScreen() {
  const router = useRouter();
  // map-core pas encore construit : on revient à l'accueil pour la démo.
  const finish = () => router.replace('/');

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <FontAwesome6 name="location-dot" size={40} color={Colors.accent} />
        </View>

        <Text style={styles.title}>
          La carte, <Text style={styles.titleBold}>centrée sur toi</Text>
        </Text>
        <Text style={styles.subtitle}>
          Active ta position pour profiter de la carte. C&apos;est facultatif — tu pourras toujours chercher un lieu à
          la main.
        </Text>

        <View style={styles.benefits}>
          {BENEFITS.map((b) => (
            <View key={b.text} style={styles.benefitRow}>
              <View style={styles.benefitIcon}>
                <FontAwesome6 name={b.icon} size={16} color={Colors.lagoon} />
              </View>
              <Text style={styles.benefitText}>{b.text}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.actions}>
        <Button
          variant="primary"
          icon={<FontAwesome6 name="location-arrow" size={16} color={Colors.white} />}
          onPress={finish}
        >
          Activer la position
        </Button>
        <Button variant="ghost" onPress={finish}>
          Plus tard
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg, paddingHorizontal: Spacing.xl },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: Spacing.lg },

  iconCircle: {
    width: 88,
    height: 88,
    borderRadius: Radius.pill,
    backgroundColor: Colors.surfaceCard,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },

  title: { color: Colors.text, fontSize: 28, fontFamily: FontFamily.light, textAlign: 'center' },
  titleBold: { fontFamily: FontFamily.black },
  subtitle: {
    color: Colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    fontFamily: FontFamily.regular,
    paddingHorizontal: Spacing.sm,
  },

  benefits: { gap: Spacing.lg, alignSelf: 'stretch', marginTop: Spacing.md },
  benefitRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  benefitIcon: {
    width: 36,
    height: 36,
    borderRadius: Radius.sm,
    backgroundColor: Colors.surfaceCard,
    alignItems: 'center',
    justifyContent: 'center',
  },
  benefitText: { color: Colors.textSecondary, fontSize: 15, flex: 1, fontFamily: FontFamily.regular, lineHeight: 20 },

  actions: { gap: Spacing.md, paddingBottom: Spacing.lg },
});
