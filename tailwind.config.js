/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        jira: {
          primary: '#0052CC',     // Primary Blue (B400) - Core brand color
          secondary: '#388BFF',   // Secondary Blue (B300) - Highlights and accents
          dark: '#172B4D',        // Dark Neutral (N800) - Primary text color
          light: '#F4F5F7',       // Light Neutral (N20) - Main background
          red: '#FF5630',         // Accent Red (R300) - Critical actions/alerts
          green: '#36B37E',       // Accent Green (G300) - Success/positive status
        },
        // Primary brand colors for language services platform (matching advisory theme)
        primary: {
          50: '#FFF3E0',
          100: '#FFCCBC',
          200: '#FFAB91',
          300: '#FF8A65',
          400: '#FF7043',
          500: '#FF5722',  // Main primary color (matching advisory theme)
          600: '#F4511E',
          700: '#E64A19',
          800: '#D84315',
          900: '#BF360C',
        },
        // Legacy advisora colors (for backward compatibility)
        advisora: {
          primary: '#FF5722',     // Primary Orange - Main brand color
          secondary: '#FF7043',   // Secondary Orange - Lighter accent
          dark: '#1A1A1A',        // Dark text color
          light: '#F5F5F5',       // Light background
          accent: '#FF6B35',      // Accent orange for highlights
          gray: {
            50: '#FAFAFA',
            100: '#F5F5F5',
            200: '#EEEEEE',
            300: '#E0E0E0',
            400: '#BDBDBD',
            500: '#9E9E9E',
            600: '#757575',
            700: '#616161',
            800: '#424242',
            900: '#212121',
          },
        },
      },
    },
  },
  plugins: [],
};
