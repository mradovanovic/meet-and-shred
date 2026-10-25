/**
 * Tokens de design Meet & Shred — dérivés de design/mockups/tokens.css.
 * Thème sombre. À porter en React Native (pas de variables CSS ici).
 * Sous-ensemble utilisé par l'écran d'accueil ; on étoffera au fil des écrans.
 */

export const Colors = {
  // Carbon — rampe neutre sombre (canvas de l'app)
  bg: '#090B0C', // carbon-950
  surface: '#0F1314', // carbon-900
  surfaceCard: '#1A2023', // carbon-800
  surfaceRaised: '#232B2F', // carbon-700
  white: '#FFFFFF',

  // Texte
  text: '#F3F7F6', // carbon-050
  textSecondary: '#B4BFC4', // carbon-200
  textMuted: '#859399', // carbon-300

  // Shred Red — marque / CTA
  accent: '#E31B23', // red-500
  accentHover: '#F2434A', // red-400
  accentPress: '#C8161E', // red-600

  // Secondaires
  lagoon: '#00C8C8', // turquoise — focus
  border: '#2E383D', // carbon-600
  borderSubtle: 'rgba(255,255,255,0.07)',

  // Sémantique statut (pour plus tard)
  danger: '#FF4D4D',
} as const;

export const Radius = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
  xxl: 28,
  pill: 999,
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const FontSize = {
  display: 44,
  h1: 34,
  h2: 26,
  h3: 21,
  title: 18,
  body: 16,
  sm: 14,
  xs: 12,
} as const;

/** Poids Roboto (fallback si la police custom n'est pas chargée). */
export const FontWeight = {
  light: '300',
  regular: '400',
  medium: '500',
  bold: '700',
  black: '900',
} as const;

/**
 * Familles de polices chargées via @expo-google-fonts (voir _layout).
 * Avec une police custom, on pose `fontFamily` (le `fontWeight` est ignoré).
 * Roboto pour le texte, Kaushan Script pour le wordmark de marque.
 */
export const FontFamily = {
  light: 'Roboto_300Light',
  regular: 'Roboto_400Regular',
  medium: 'Roboto_500Medium',
  bold: 'Roboto_700Bold',
  black: 'Roboto_900Black',
  script: 'KaushanScript_400Regular',
} as const;
