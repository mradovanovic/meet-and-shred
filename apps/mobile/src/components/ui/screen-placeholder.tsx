import { FontAwesome6 } from '@expo/vector-icons';
import { type ComponentProps } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors, FontFamily, Spacing } from '@/theme/tokens';

type Props = {
  icon: ComponentProps<typeof FontAwesome6>['name'];
  title: string;
  subtitle?: string;
};

/** Écran « à venir » (onglets pas encore construits). */
export function ScreenPlaceholder({ icon, title, subtitle }: Props) {
  return (
    <View style={styles.c}>
      <FontAwesome6 name={icon} size={38} color={Colors.textMuted} />
      <Text style={styles.t}>{title}</Text>
      {subtitle ? <Text style={styles.s}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  c: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Spacing.sm, backgroundColor: Colors.bg },
  t: { color: Colors.text, fontSize: 18, fontFamily: FontFamily.medium },
  s: { color: Colors.textMuted, fontSize: 14, fontFamily: FontFamily.regular },
});
