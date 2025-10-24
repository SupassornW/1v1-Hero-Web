export const theme = {
  colors: {
    bg: '#0f1222',
    panel: '#15193a',
    text: '#e6e8ff',
    accent: '#7c9cff',
    danger: '#ff6b6b',
    muted: '#95a1c3',
    success: '#51cf66',
  },
  radius: '16px',
  spacing: (n: number) => `${n * 4}px`,
  transitions: {
    default: '0.2s ease',
    slow: '0.4s ease',
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1440px',
  },
} as const;

export type Theme = typeof theme;

