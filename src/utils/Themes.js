const darkDesignTokens = {
  // Base backgrounds
  bg: '#0c0c1d', // deepest page background
  bgLight: '#16162a', // slightly lifted surface
  bgGlass: 'rgba(18, 18, 35, 0.6)', // frosted glass background

  // Text
  text_primary: '#f2f2f7',
  text_secondary: '#a0a0b8',

  // Accent
  primary: '#8b5cf6',
  accentGlow: '#8b5cf6',
  accentGradient: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',

  // Cards & surfaces
  card: '#171721',
  card_light: '#191924',

  // Borders & shadows (glassmorphism)
  borderGlass: 'rgba(255, 255, 255, 0.1)',
  shadowSm: '0 4px 12px rgba(0, 0, 0, 0.4)',
  shadowMd: '0 8px 30px rgba(0, 0, 0, 0.6)',
  shadowGlow: '0 0 20px rgba(139, 92, 246, 0.25)',

  // Button
  button: '#8b5cf6',

  // Miscellaneous
  white: '#FFFFFF',
  black: '#000000',
};

// Light theme (optional – can be expanded later)
const lightDesignTokens = {
  bg: '#ffffff',
  bgLight: '#f5f5f7',
  bgGlass: 'rgba(255, 255, 255, 0.6)',
  text_primary: '#111111',
  text_secondary: '#48494a',
  primary: '#8b5cf6',
  accentGlow: '#8b5cf6',
  accentGradient: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
  card: '#ffffff',
  card_light: '#fafafa',
  borderGlass: 'rgba(0, 0, 0, 0.08)',
  shadowSm: '0 4px 12px rgba(0, 0, 0, 0.06)',
  shadowMd: '0 8px 30px rgba(0, 0, 0, 0.1)',
  shadowGlow: '0 0 20px rgba(139, 92, 246, 0.2)',
  button: '#8b5cf6',
  white: '#FFFFFF',
  black: '#000000',
};

export const darkTheme = darkDesignTokens;
export const lightTheme = lightDesignTokens;
