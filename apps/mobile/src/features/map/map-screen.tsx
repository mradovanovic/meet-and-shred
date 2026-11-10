import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, FontFamily, Radius, Spacing } from '@/theme/tokens';
import { MapView } from './map-view';
import { useNearbySpots } from './use-nearby-spots';

// Centre par défaut sur la France (démo — pas encore la position réelle du rider).
const DEFAULT_CENTER = { lat: 46.6, lng: 2.4 };

export default function MapScreen() {
  const { spots, loading, error } = useNearbySpots(DEFAULT_CENTER.lat, DEFAULT_CENTER.lng);

  return (
    <View style={styles.root}>
      <MapView spots={spots} center={DEFAULT_CENTER} zoom={4.6} />

      <SafeAreaView edges={['top']} style={styles.header} pointerEvents="box-none">
        <View style={styles.pill}>
          <Text style={styles.pillText}>
            {loading ? 'Chargement…' : error ? 'Erreur de chargement' : `${spots.length} spots autour de toi`}
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, position: 'relative', backgroundColor: Colors.bg },
  header: { position: 'absolute', top: 0, left: 0, right: 0, alignItems: 'center', paddingTop: Spacing.sm },
  pill: {
    backgroundColor: Colors.surfaceCard,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    marginTop: Spacing.sm,
  },
  pillText: { color: Colors.text, fontSize: 14, fontFamily: FontFamily.medium },
});
