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
        // Apple-like colors (simplified for example)
        // Light Mode
        'apple-bg-light': '#f5f5f7',
        'apple-text-light': '#1d1d1f',
        'apple-accent-light': '#007aff',
        'apple-card-light': '#ffffff',
        'apple-border-light': '#d2d2d7',
        
        // Dark Mode
        'apple-bg-dark': '#1b1b1b',
        'apple-text-dark': '#f5f5f7',
        'apple-accent-dark': '#2997ff',
        'apple-card-dark': '#2c2c2e',
        'apple-border-dark': '#3a3a3c',
      },
      // Custom font examples (if you want to use specific Apple-like fonts, need to import them)
      fontFamily: {
        // Example: If you were to self-host or import via Google Fonts a San Francisco-like font
        // sfpro: ['SF Pro Display', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
export default config;
