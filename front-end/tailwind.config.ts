import type { Config } from 'tailwindcss';
const { fontFamily } = require('tailwindcss/defaultTheme');

const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        secondary: '#2D3351',
        teal: 'var(--teal)',
        grey: '#67678A',
        default: '#6C708D',
        grey200: '#c3c3ec',
        teal500: '#27CAA3',
        grey300: '#3F4362',
        popover: '#2D3351',
        'popover-foreground': '#c3c3ec',
        accent: '#67678A',
        input: '#67678A',
      },

      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
export default config;
