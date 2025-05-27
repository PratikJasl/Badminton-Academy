module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      // ...any other files that contain your HTML/JSX
    ],
    safelist: [
      'active:text-blue-500',
      'focus:text-blue-500',
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['Inter', 'sans-serif']
        }
      },
    },
    plugins: [],
  };