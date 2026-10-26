import { FontAwesome6 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState, type ComponentProps } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/button';
import { Colors, FontFamily, Radius, Spacing } from '@/theme/tokens';
import { DisciplineMontage } from './discipline-montage';
import { validateCredentials } from './credentials';

type Mode = 'intro' | 'email';
type ProviderIcon = ComponentProps<typeof FontAwesome6>['name'];

// Fournisseurs de connexion (change auth-registration). Apple ajouté sur iOS
// (règle App Store : obligatoire dès qu'un autre service tiers est proposé).
const BASE_PROVIDERS: { key: string; label: string; icon: ProviderIcon }[] = [
  { key: 'google', label: 'Continuer avec Google', icon: 'google' },
  { key: 'facebook', label: 'Continuer avec Facebook', icon: 'facebook' },
  { key: 'tiktok', label: 'Continuer avec TikTok', icon: 'tiktok' },
];

const PROVIDERS =
  Platform.OS === 'ios'
    ? [{ key: 'apple', label: 'Continuer avec Apple', icon: 'apple' as ProviderIcon }, ...BASE_PROVIDERS]
    : BASE_PROVIDERS;

export default function WelcomeScreen() {
  const [mode, setMode] = useState<Mode>('intro');
  const router = useRouter();
  const onAuthenticated = () => router.push('/location');

  return (
    <View style={styles.root}>
      {/* Héro + liseret rouge */}
      <View style={[styles.hero, { height: mode === 'intro' ? 300 : 190 }]}>
        <DisciplineMontage />
        <SafeAreaView edges={['top']} style={styles.heroInner}>
          <Text style={styles.heroKicker}>Bienvenue sur</Text>
          <Text style={styles.wordmark}>meetnshred</Text>
        </SafeAreaView>
      </View>
      <View style={styles.liseret} />

      {mode === 'intro' ? (
        <Intro onEmail={() => setMode('email')} onAuthenticated={onAuthenticated} />
      ) : (
        <EmailForm onBack={() => setMode('intro')} onAuthenticated={onAuthenticated} />
      )}
    </View>
  );
}

function Intro({ onEmail, onAuthenticated }: { onEmail: () => void; onAuthenticated: () => void }) {
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
          <Button
            key={p.key}
            variant="secondary"
            icon={<FontAwesome6 name={p.icon} size={18} color={Colors.text} />}
            onPress={onAuthenticated}
          >
            {p.label}
          </Button>
        ))}

        <Divider label="ou" />

        <Button
          variant="primary"
          icon={<FontAwesome6 name="envelope" size={17} color={Colors.white} />}
          onPress={onEmail}
        >
          Avec mon email
        </Button>

        <LegalLine />
      </View>
    </ScrollView>
  );
}

function EmailForm({ onBack, onAuthenticated }: { onBack: () => void; onAuthenticated: () => void }) {
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
        <Button variant="primary" disabled={!canSubmit} onPress={onAuthenticated}>
          C&apos;est parti
        </Button>
        <Button variant="ghost" onPress={onBack}>
          Retour
        </Button>
      </View>
    </ScrollView>
  );
}

// ── Petits composants propres à l'écran ──

function Divider({ label }: { label: string }) {
  return (
    <View style={styles.divider}>
      <View style={styles.dividerLine} />
      <Text style={styles.dividerLabel}>{label}</Text>
      <View style={styles.dividerLine} />
    </View>
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
        {checked ? <FontAwesome6 name="check" size={12} color={Colors.white} /> : null}
      </View>
      <Text style={styles.checkLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  hero: { backgroundColor: Colors.surfaceCard, justifyContent: 'flex-end', overflow: 'hidden' },
  heroInner: { alignItems: 'center', paddingBottom: Spacing.xxl, gap: Spacing.sm },
  heroKicker: { color: Colors.textSecondary, fontSize: 15, fontFamily: FontFamily.light },
  wordmark: { color: Colors.white, fontSize: 46, fontFamily: FontFamily.script, lineHeight: 56 },
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

  tagline: { color: Colors.text, fontSize: 22, lineHeight: 29, textAlign: 'center', fontFamily: FontFamily.light },
  taglineBold: { fontFamily: FontFamily.black },

  formTitle: { color: Colors.text, fontSize: 26, fontFamily: FontFamily.light },
  formTitleBold: { fontFamily: FontFamily.black },

  actions: { marginTop: 'auto', gap: Spacing.md, paddingTop: Spacing.lg },

  divider: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, paddingVertical: Spacing.xs },
  dividerLine: { flex: 1, height: 1, backgroundColor: Colors.border },
  dividerLabel: { color: Colors.textMuted, fontSize: 13, fontFamily: FontFamily.regular },

  legal: { color: Colors.textMuted, fontSize: 12, textAlign: 'center', lineHeight: 18, marginTop: Spacing.xs, fontFamily: FontFamily.regular },
  legalLink: { color: Colors.textSecondary, textDecorationLine: 'underline' },

  field: { gap: Spacing.xs },
  fieldLabel: { color: Colors.textSecondary, fontSize: 13, fontFamily: FontFamily.medium },
  input: {
    height: 50,
    borderRadius: Radius.sm,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
    color: Colors.text,
    fontSize: 16,
    fontFamily: FontFamily.regular,
  },
  inputError: { borderColor: Colors.danger },
  errorText: { color: Colors.danger, fontSize: 12, fontFamily: FontFamily.regular },

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
  checkLabel: { color: Colors.textSecondary, fontSize: 13, flex: 1, fontFamily: FontFamily.regular },
});
