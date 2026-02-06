import type { Config } from 'tailwindcss';

const config: Config = {
  // Temporarily disabling dark mode to match the fixed light theme of the Wix template
  // darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'theme-bg': '#6b7b8f', // Muted blue-gray from cloud background
        'theme-text-primary': '#ffffff', // White for main headings
        'theme-text-secondary': '#d0d0d0', // Lighter gray for subtle text
        'theme-button-bg': '#364560', // Dark blue for buttons
        'theme-button-text': '#ffffff', // White text on buttons
        'theme-border': '#d0d0d0', // Light gray for borders/inputs
      },
      fontFamily: {},
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
