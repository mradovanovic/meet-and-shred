import { FontAwesome6 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { type ComponentProps } from 'react';
import { StyleSheet, View } from 'react-native';

import { Colors } from '@/theme/tokens';

type IconName = ComponentProps<typeof FontAwesome6>['name'];

// Icônes évoquant les disciplines de ride (collage de fond, libre de droits).
// Placeholder : à remplacer par un vrai montage photo quand on aura les assets.
const DISCIPLINE_ICONS: IconName[] = [
  'motorcycle',
  'person-biking',
  'person-snowboarding',
  'person-skiing',
  'water',
  'wind',
  'person-skating',
  'mountain',
  'bolt',
  'snowflake',
  'fire',
  'person-swimming',
];

const TILES: IconName[] = Array.from({ length: 36 }, (_, i) => DISCIPLINE_ICONS[i % DISCIPLINE_ICONS.length]);

/** Fond « multi-disciplines » : collage d'icônes atténuées + dégradé pour la lisibilité du logo. */
export function DisciplineMontage() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <View style={styles.grid}>
        {TILES.map((name, i) => (
          <FontAwesome6 key={i} name={name} size={30} color={Colors.white} style={styles.icon} />
        ))}
      </View>
      <LinearGradient
        colors={['rgba(26,32,35,0.1)', 'rgba(15,19,20,0.92)']}
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  icon: { opacity: 0.09, margin: 12 },
});
