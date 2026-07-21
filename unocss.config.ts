import { defineConfig, presetIcons, presetWebFonts, presetWind4 } from 'unocss'

export default defineConfig({
  presets: [
    presetWind4(),
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'Nunito',
      },
    }),
  ],
  theme: {
    colors: {
      background: 'var(--background)',
      foreground: 'var(--foreground)',
      surface: {
        DEFAULT: 'var(--surface)',
        foreground: 'var(--surface-foreground)',
      },
      primary: {
        DEFAULT: 'var(--primary)',
        hover: 'var(--primary-hover)',
        foreground: 'var(--primary-foreground)',
      },
      secondary: {
        DEFAULT: 'var(--secondary)',
        hover: 'var(--secondary-hover)',
        foreground: 'var(--secondary-foreground)',
      },
      outline: 'var(--outline)',
      ghost: {
        hover: 'var(--ghost-hover)',
        foreground: 'var(--ghost-foreground)',
      },
      muted: {
        DEFAULT: 'var(--muted)',
        foreground: 'var(--muted-foreground)',
      },
      accent: {
        DEFAULT: 'var(--accent)',
        active: 'var(--accent-active)',
        foreground: 'var(--accent-foreground)',
      },
      destructive: {
        foreground: 'var(--destructive-foreground)',
        background: 'var(--destructive-background)',
        border: 'var(--destructive-border)',
      },
      border: {
        DEFAULT: 'var(--border-soft)',
        hard: 'var(--border-hard)',
        soft: 'var(--border-soft)',
      },
      ring: {
        DEFAULT: 'var(--ring)',
        error: 'var(--ring-error)',
      },
      input: 'var(--input)',
    },
  },
})
