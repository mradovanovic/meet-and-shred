import { FontAwesome6 } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { Colors, FontFamily, Spacing } from '@/theme/tokens';
import type { MapViewProps } from './types';

// Placeholder natif : la carte Mapbox native arrivera avec le build de dev
// (@rnmapbox/maps). En attendant, on confirme que les données remontent.
export function MapView({ spots }: MapViewProps) {
  return (
    <View style={styles.c}>
      <FontAwesome6 name="map-location-dot" size={40} color={Colors.textMuted} />
      <Text style={styles.t}>Carte à venir sur le build mobile</Text>
      <Text style={styles.s}>{spots.length} spots autour de toi</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  c: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Spacing.sm, backgroundColor: Colors.surface },
  t: { color: Colors.text, fontSize: 16, fontFamily: FontFamily.medium },
  s: { color: Colors.textMuted, fontSize: 14, fontFamily: FontFamily.regular },
});
