import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Map semantic names used in components to CSS variables for light/dark
        'card-light': 'rgb(var(--card-rgb) / <alpha-value>)',
        'card-dark': 'rgb(var(--card-rgb) / <alpha-value>)',
        'foreground': 'rgb(var(--foreground-rgb) / <alpha-value>)',
        'accent-light': 'rgb(var(--accent-rgb) / <alpha-value>)',
        'accent-dark': 'rgb(var(--accent-rgb) / <alpha-value>)',
        'border-light': 'rgb(var(--border-rgb) / <alpha-value>)',
        'border-dark': 'rgb(var(--border-rgb) / <alpha-value>)',
      },
      // Custom font examples
      fontFamily: {},
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
