module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c3d66',
        },
        accent: {
          blue: '#0284c7',
          navy: '#0c3d66',
          slate: '#475569',
          light: '#f1f5f9',
        }
      },
      spacing: {
        'section': '5rem',
      },
      boxShadow: {
        'soft': '0 4px 6px rgba(0, 0, 0, 0.05)',
        'medium': '0 10px 15px rgba(0, 0, 0, 0.1)',
        'glow-blue': '0 0 20px rgba(2, 132, 199, 0.15)',
        'glow-blue-hover': '0 0 30px rgba(2, 132, 199, 0.25)',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      transitionDuration: {
        '300': '300ms',
      }
    },
  },
  plugins: [],
}
