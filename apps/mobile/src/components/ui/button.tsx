import { type ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View, type PressableProps } from 'react-native';

import { Colors, FontFamily, Radius, Spacing } from '@/theme/tokens';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type ButtonProps = PressableProps & {
  variant?: ButtonVariant;
  disabled?: boolean;
  icon?: ReactNode;
  children: ReactNode;
};

/** Bouton de base de l'app (coquille — socle d'un futur design system). */
export function Button({ variant = 'secondary', disabled, icon, children, ...rest }: ButtonProps) {
  const bg =
    variant === 'primary'
      ? disabled
        ? Colors.surfaceRaised
        : Colors.accent
      : variant === 'secondary'
        ? Colors.surfaceRaised
        : 'transparent';
  const color =
    variant === 'primary'
      ? disabled
        ? Colors.textMuted
        : Colors.white
      : variant === 'ghost'
        ? Colors.textMuted
        : Colors.text;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      style={({ pressed }) => [styles.btn, { backgroundColor: bg }, pressed && !disabled && { opacity: 0.85 }]}
      {...rest}
    >
      <View style={styles.inner}>
        {icon ? <View style={styles.icon}>{icon}</View> : null}
        <Text style={[styles.text, { color }]}>{children}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: { height: 52, borderRadius: Radius.sm, justifyContent: 'center', paddingHorizontal: Spacing.lg },
  inner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm },
  icon: { width: 22, alignItems: 'center' },
  text: { fontSize: 16, fontFamily: FontFamily.medium },
});
