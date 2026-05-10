export const Colors = {
  // Primary Panini palette
  red: '#E31E24',
  dark: '#1A0A0A',
  cream: '#F5F0E8',
  gold: '#FFD700',
  black: '#0F0A0A',

  // Position colors
  sky: '#2D6BFF',   // DEF
  turf: '#0F5132',  // MF
  amber: '#FBC531', // GK
  coral: '#FF4757', // FW

  // UI grays
  gray100: '#F7F7F7',
  gray200: '#E8E8E8',
  gray400: '#AAAAAA',
  gray600: '#666666',
  gray800: '#333333',

  // Semantic
  surface: '#FFFFFF',
  surfaceDark: '#1E1010',
  border: 'rgba(0,0,0,0.10)',
  borderDark: 'rgba(255,255,255,0.12)',
  overlay: 'rgba(0,0,0,0.55)',
  cardShadow: 'rgba(227,30,36,0.18)',
} as const;

export const PositionColor: Record<string, string> = {
  GK: Colors.amber,
  DEF: Colors.sky,
  MF: Colors.turf,
  FW: Colors.red,
};

export type ColorKey = keyof typeof Colors;
