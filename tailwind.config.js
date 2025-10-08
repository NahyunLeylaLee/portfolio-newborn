/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Overall page background and main text colors
        'page-bg': '#FDFBF7', // Very light, creamy beige
        'heading-dark': '#332B22', // Dark brown for main headings
        'body-text': '#6B5E52',    // Muted brown/gray for body text

        // Primary brand color: Dark Brown (for buttons, strong accents, main elements)
        brand: {
          50: '#F8F5F0', // Very light shade, almost white
          100: '#EFEAE4', // Light beige, for card backgrounds, subtle elements
          200: '#DCD4C9',
          300: '#C7BBAF',
          400: '#B2A295',
          500: '#9D897B',
          600: '#887061',
          700: '#735747',
          800: '#5C4033', // Main dark brown
          900: '#473127',
          950: '#33231C',
        },
        // Accent colors for specific elements (e.g., pricing highlight, icons)
        'accent-yellow': '#FDF0D5',
        'accent-orange': '#FCE0D0', 
        'accent-blue': '#D0E0F0',
        'accent-purple': '#E0D0F0',
        'accent-green': '#D4E7D4',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
