import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Twitter/X Brand Colors
        brand: {
          DEFAULT: '#1d9bf0',
          hover: '#1a8cd8',
          active: '#1a8cd8',
        },
        // Background colors
        background: {
          DEFAULT: '#ffffff',
          secondary: '#f7f9f9',
          tertiary: '#eff3f4',
          hover: 'rgba(0, 0, 0, 0.03)',
        },
        // Text colors
        text: {
          DEFAULT: '#0f1419',
          secondary: '#536471',
          tertiary: '#75828d',
          link: '#1d9bf0',
        },
        // Border colors
        border: {
          DEFAULT: '#eff3f4',
          dark: '#cfd9de',
        },
        // Action colors
        like: {
          DEFAULT: '#f91880',
          bg: 'rgba(249, 24, 128, 0.1)',
        },
        retweet: {
          DEFAULT: '#00ba7c',
          bg: 'rgba(0, 186, 124, 0.1)',
        },
        reply: {
          DEFAULT: '#1d9bf0',
          bg: 'rgba(29, 155, 240, 0.1)',
        },
        // Legacy support
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#1d9bf0',
          600: '#1a8cd8',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      fontSize: {
        '13': '13px',
        '15': '15px',
        '17': '17px',
        '20': '20px',
        '23': '23px',
      },
      spacing: {
        '13': '52px',
        '15': '60px',
        '18': '72px',
        '68': '275px',
        '88': '350px',
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '20px',
        'full': '9999px',
      },
      boxShadow: {
        'card': '0 0 15px rgba(101, 119, 134, 0.2)',
        'dropdown': '0 0 15px rgba(101, 119, 134, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'slide-up': 'slideUp 0.2s ease-out',
        'scale-in': 'scaleIn 0.15s ease-out',
        'heart-pop': 'heartPop 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        heartPop: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      transitionTimingFunction: {
        'twitter': 'cubic-bezier(0.17, 0.67, 0.5, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
