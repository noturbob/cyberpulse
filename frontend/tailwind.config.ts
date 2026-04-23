import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        // Primary: Cyber Blue (Security & Trust)
        cyber: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#c7e0fd',
          300: '#a3d0fc',
          400: '#7bb7f8',
          500: '#3b82f6', // Main cyber blue
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        // Risk Levels
        risk: {
          critical: '#ef4444', // red-500
          high: '#f97316', // orange-500
          medium: '#eab308', // yellow-500
          low: '#22c55e', // green-500
          safe: '#10b981', // emerald-500
        },
        // Glass / Backdrop Colors
        glass: {
          1: 'rgb(255 255 255 / 0.03)',
          2: 'rgb(255 255 255 / 0.06)',
          border: 'rgb(255 255 255 / 0.08)',
          'border-hover': 'rgb(255 255 255 / 0.15)',
        },
      },
      backgroundColor: {
        // Premium dark backgrounds
        'bg-base': '#050810',
        'bg-surface': '#0d1117',
        'bg-elevated': '#161b27',
      },
      backdropBlur: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
      },
      boxShadow: {
        // Glow effects for cyber blue
        'glow-cyber': '0 0 40px rgba(59, 130, 246, 0.3), 0 0 80px rgba(59, 130, 246, 0.1)',
        'glow-cyber-sm': '0 0 20px rgba(59, 130, 246, 0.2)',
        // Glow for risk colors
        'glow-critical': '0 0 40px rgba(239, 68, 68, 0.3)',
        'glow-high': '0 0 40px rgba(249, 115, 22, 0.3)',
        'glow-medium': '0 0 40px rgba(234, 179, 8, 0.2)',
        'glow-safe': '0 0 40px rgba(16, 185, 129, 0.3)',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.5s ease-out',
        'scale-in': 'scale-in 0.4s ease-out',
        'slide-in-left': 'slide-in-left 0.4s ease-out',
        'pulse-soft': 'pulse-soft 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      borderRadius: {
        xs: '0.25rem',
        sm: '0.375rem',
        base: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
    },
  },
  plugins: [],
}

export default config
