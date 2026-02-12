import { Platform } from 'react-native';

export const Colors = {
  background: '#0A0A0F',
  card: '#12121A',
  surface: '#1A1A25',
  gold: '#D4AF37',
  goldLight: '#F0D060',
  goldDark: '#B8960C',
  purple: '#8B5CF6',
  purpleLight: '#A78BFA',
  text: '#FAFAFA',
  textSecondary: '#A0A0B0',
  border: '#2A2A35',
  tabBar: '#0D0D14',
  danger: '#EF4444',
  success: '#22C55E',
  // Compatibility with ThemedView/ThemedText
  light: {
    text: '#FAFAFA',
    background: '#0A0A0F',
    tint: '#D4AF37',
    icon: '#A0A0B0',
    tabIconDefault: '#A0A0B0',
    tabIconSelected: '#D4AF37',
  },
  dark: {
    text: '#FAFAFA',
    background: '#0A0A0F',
    tint: '#D4AF37',
    icon: '#A0A0B0',
    tabIconDefault: '#A0A0B0',
    tabIconSelected: '#D4AF37',
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  },
});
