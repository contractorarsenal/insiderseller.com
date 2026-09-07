import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    screens: {
      xs: '375px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
      '3xl': '1728px',
    },
    extend: {
      colors: {
        black: '#000000',
        white: '#FFFFFF',
        edwhite: '#FDFDFD',
        charcoal: '#1A1A1A',
        archive: '#EAEAEA',
        muted: '#808080',
        yellow: '#FBD601',
      },
      fontFamily: {
        display: ['var(--font-archivo)', 'var(--font-inter-tight)', 'Helvetica', 'Arial', 'sans-serif'],
        sans: ['var(--font-inter-tight)', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        wide: '0.04em',
        wider: '0.08em',
        widest: '0.14em',
      },
      borderRadius: {
        none: '0px',
        DEFAULT: '0px',
      },
      transitionDuration: {
        150: '150ms',
        250: '250ms',
        300: '300ms',
      },
      maxWidth: {
        screen: '100vw',
      },
    },
  },
  plugins: [],
};

export default config;
