module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        cursive: ['Caveat', 'cursive'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
