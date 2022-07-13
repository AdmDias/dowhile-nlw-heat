/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      gridTemplateColumns: {
        custom: '1fr 453px'
      },
      backgroundImage: {
        loginImage: 'url(/src/assets/bg-login-image.png)',
        gradient: 'linear-gradient(100deg, #FF008E 0%, #FFCD1E 100%)'
      },
      fontFamily: {
        sans: 'Roboto, sans-serif'
      },
      colors: {
        green: {
          300: '#00B37E',
          500: '#00875F',
          700: '#015F43',
        },
        blue: {
          500: '#81D8F7',
        },
        yellow: {
          400: '#FFCD1E',
        },
        red: {
          500: '#F75A68',
        },
        gray: {
          100: '#E1E1E6',
          200: '#C4C4CC',
          300: '#8D8D99',
          500: '#323238',
          600: '#29292E',
          700: '#121214',
          800: '#1b1b1f',
          900: '#09090A'
        }
      },
    },
  },
  plugins: [],
}
