import scrollbar from 'tailwind-scrollbar';

module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    safelist: [
      'active:text-blue-500',
      'focus:text-blue-500',
    ],
    theme: 
    {
      fontFamily: {
          sans: ['Inter', 'sans-serif'],
          poppins: ['Poppins', 'sans-serif'],
      },
    },
    plugins: [
      scrollbar,
    ],
};