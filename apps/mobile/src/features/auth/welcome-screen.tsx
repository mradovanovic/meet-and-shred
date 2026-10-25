import { useState, type ComponentProps, type ReactNode } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  type PressableProps,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, FontWeight, Radius, Spacing } from '@/theme/tokens';
import { validateCredentials } from './credentials';

type Mode = 'intro' | 'email';

// Fournisseurs de connexion (change auth-registration). Apple est ajouté sur iOS
// (règle App Store : obligatoire dès qu'un autre service tiers est proposé).
const BASE_PROVIDERS = [
  { key: 'google', label: 'Continuer avec Google' },
  { key: 'facebook', label: 'Continuer avec Facebook' },
  { key: 'tiktok', label: 'Continuer avec TikTok' },
] as const;

const PROVIDERS =
  Platform.OS === 'ios'
    ? ([{ key: 'apple', label: 'Continuer avec Apple' }, ...BASE_PROVIDERS] as const)
    : BASE_PROVIDERS;

export default function WelcomeScreen() {
  const [mode, setMode] = useState<Mode>('intro');

  return (
    <View style={styles.root}>
      {/* Héro + liseret rouge */}
      <View style={[styles.hero, { height: mode === 'intro' ? 300 : 180 }]}>
        <SafeAreaView edges={['top']} style={styles.heroInner}>
          <Text style={styles.heroKicker}>Bienvenue sur</Text>
          <Text style={styles.wordmark}>meetnshred</Text>
        </SafeAreaView>
      </View>
      <View style={styles.liseret} />

      {mode === 'intro' ? <Intro onEmail={() => setMode('email')} /> : <EmailForm onBack={() => setMode('intro')} />}
    </View>
  );
}

function Intro({ onEmail }: { onEmail: () => void }) {
  return (
    <ScrollView contentContainerStyle={styles.body}>
      <View style={styles.gestures}>
        {['🤙', '✌️', '✊'].map((g, i) => (
          <View key={i} style={styles.gestureCircle}>
            <Text style={styles.gestureGlyph}>{g}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.tagline}>
        Trouve les spots ouverts <Text style={styles.taglineBold}>et roule avec ta crew</Text>
      </Text>

      <View style={styles.actions}>
        {PROVIDERS.map((p) => (
          <Button key={p.key} variant="secondary" onPress={() => {}}>
            {p.label}
          </Button>
        ))}
        <Button variant="primary" onPress={onEmail}>
          Avec mon email
        </Button>
        <LegalLine />
      </View>
    </ScrollView>
  );
}

function EmailForm({ onBack }: { onBack: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [consent, setConsent] = useState(false);
  const [age, setAge] = useState(false);
  const [touched, setTouched] = useState(false);

  const { emailValid, passwordValid, valid } = validateCredentials(email, password);
  const canSubmit = valid && consent && age;

  return (
    <ScrollView contentContainerStyle={styles.body} keyboardShouldPersistTaps="handled">
      <Text style={styles.formTitle}>
        Crée ton <Text style={styles.formTitleBold}>compte rider</Text>
      </Text>

      <LabeledInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        onBlur={() => setTouched(true)}
        placeholder="toi@email.com"
        keyboardType="email-address"
        autoCapitalize="none"
        error={touched && !emailValid ? 'Email invalide' : undefined}
      />
      <LabeledInput
        label="Mot de passe"
        value={password}
        onChangeText={setPassword}
        onBlur={() => setTouched(true)}
        placeholder="8 caractères minimum"
        secureTextEntry
        error={touched && !passwordValid ? '8 caractères minimum' : undefined}
      />

      <Checkbox
        checked={consent}
        onToggle={() => setConsent((v) => !v)}
        label="J'accepte les CGU et la politique de confidentialité"
      />
      <Checkbox checked={age} onToggle={() => setAge((v) => !v)} label="J'ai 16 ans ou plus" />

      <View style={styles.actions}>
        <Button variant="primary" disabled={!canSubmit} onPress={() => {}}>
          C&apos;est parti
        </Button>
        <Button variant="ghost" onPress={onBack}>
          Retour
        </Button>
      </View>
    </ScrollView>
  );
}

// ── Composants UI (coquille — à extraire dans un design system plus tard) ──

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

function Button({
  variant = 'secondary',
  disabled,
  children,
  ...rest
}: PressableProps & { variant?: ButtonVariant; disabled?: boolean; children: ReactNode }) {
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
      <Text style={[styles.btnText, { color }]}>{children}</Text>
    </Pressable>
  );
}

function LegalLine() {
  return (
    <Text style={styles.legal}>
      En continuant, tu acceptes les{' '}
      <Text style={styles.legalLink} onPress={() => {}}>
        CGU
      </Text>{' '}
      et la{' '}
      <Text style={styles.legalLink} onPress={() => {}}>
        politique de confidentialité
      </Text>
      .
    </Text>
  );
}

function LabeledInput({
  label,
  error,
  ...rest
}: ComponentProps<typeof TextInput> & { label: string; error?: string }) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        placeholderTextColor={Colors.textMuted}
        {...rest}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

function Checkbox({ checked, onToggle, label }: { checked: boolean; onToggle: () => void; label: string }) {
  return (
    <Pressable accessibilityRole="checkbox" accessibilityState={{ checked }} onPress={onToggle} style={styles.checkRow}>
      <View style={[styles.checkBox, checked && styles.checkBoxOn]}>
        {checked ? <Text style={styles.checkMark}>✓</Text> : null}
      </View>
      <Text style={styles.checkLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  hero: { backgroundColor: Colors.surfaceCard, justifyContent: 'flex-end' },
  heroInner: { alignItems: 'center', paddingBottom: Spacing.xxl, gap: Spacing.xs },
  heroKicker: { color: Colors.white, fontSize: 15, fontWeight: FontWeight.light },
  wordmark: {
    color: Colors.white,
    fontSize: 40,
    fontWeight: FontWeight.black,
    fontStyle: 'italic',
    letterSpacing: -1,
  },
  liseret: { height: 8, backgroundColor: Colors.accent },

  body: { padding: Spacing.xl, gap: Spacing.lg, flexGrow: 1 },

  gestures: { flexDirection: 'row', justifyContent: 'center', gap: Spacing.xl, marginTop: Spacing.sm },
  gestureCircle: {
    width: 62,
    height: 62,
    borderRadius: Radius.pill,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gestureGlyph: { fontSize: 28 },

  tagline: { color: Colors.text, fontSize: 22, lineHeight: 28, textAlign: 'center', fontWeight: FontWeight.light },
  taglineBold: { fontWeight: FontWeight.black },

  formTitle: { color: Colors.text, fontSize: 26, fontWeight: FontWeight.light },
  formTitleBold: { fontWeight: FontWeight.black },

  actions: { marginTop: 'auto', gap: Spacing.md, paddingTop: Spacing.lg },

  btn: { height: 52, borderRadius: Radius.sm, alignItems: 'center', justifyContent: 'center', paddingHorizontal: Spacing.lg },
  btnText: { fontSize: 16, fontWeight: FontWeight.medium },

  legal: { color: Colors.textMuted, fontSize: 12, textAlign: 'center', lineHeight: 18, marginTop: Spacing.xs },
  legalLink: { color: Colors.textSecondary, textDecorationLine: 'underline' },

  field: { gap: Spacing.xs },
  fieldLabel: { color: Colors.textSecondary, fontSize: 13, fontWeight: FontWeight.medium },
  input: {
    height: 50,
    borderRadius: Radius.sm,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
    color: Colors.text,
    fontSize: 16,
  },
  inputError: { borderColor: Colors.danger },
  errorText: { color: Colors.danger, fontSize: 12 },

  checkRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  checkBox: {
    width: 22,
    height: 22,
    borderRadius: Radius.xs,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBoxOn: { backgroundColor: Colors.accent, borderColor: Colors.accent },
  checkMark: { color: Colors.white, fontSize: 14, fontWeight: FontWeight.bold },
  checkLabel: { color: Colors.textSecondary, fontSize: 13, flex: 1 },
});
