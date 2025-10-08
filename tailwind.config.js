/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Overall page background and main text colors
        'page-bg': '#FDFBF7', // Very light, creamy beige (main background)
        'heading-dark': '#2D1B1B', // Dark brown for main headings
        'body-text': '#5A4A3A',    // Muted brown/gray for body text
        'card-color': '#FDF9F6', // Pink beige inside of Card 

        // Primary brand color: Dark Brown/Amber (for buttons, strong accents, main elements)
        brand: {
          50: '#FDFBF7', // Cream beige (section backgrounds)
          100: '#FFFFFF', // White (card backgrounds)
          200: '#F5F1EB', // Light beige (borders, subtle elements)
          300: '#E8DDD4', // Medium beige (borders, icon backgrounds)
          400: '#D4C4B0', // Warm beige
          500: '#B8A082', // Medium brown
          600: '#9C7C5A', // Darker brown
          700: '#8B6F47', // Dark brown
          800: '#772D08', // Main dark brown (buttons, text) - custom color
          900: '#8B3509', // Lighter brown for hover
          950: '#2D1B1B', // Very dark brown
        },
        // Accent colors for specific elements (e.g., pricing highlight, icons)
        'accent-yellow': '#F4E4BC', // Warm yellow/amber
        'accent-orange': '#E8C4A0', // Warm orange/amber
        'accent-blue': '#C8D5E0', // Muted blue
        'accent-purple': '#D4C8E0', // Muted purple
        'accent-green': '#C8D4C0', // Muted green
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
