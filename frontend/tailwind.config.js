/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.tsx", "./*.tsx"],
  theme: {
    extend: {
      colors: {
        'bg': '#1f1f1f',
        'bg-mid': '#3d3d3d',
        'bg-light': '#777777',
        'light': '#dedede',
        'bad-color': '#de0000',
        'average-color': '#de7300',
        'medium-color': '#f0da00',
        'almost-color': '#5de800',
        'good-color': '#16b800',
        'txt': '#f0f0f0',
        'sub-txt': '#cccccc',
        'essencial': '#aa1717',
        'lazer': '#00ff94',
        'ocasional': '#ab18e4',
        'assinaturas': '#0500ff',
        'delivery': '#ff6700',
        'cash-in': '#33d17a'
      },
      fontFamily: {
        mt: ['Montserrat', 'sans-serif']
      }
    },
  },
  plugins: [],
}

