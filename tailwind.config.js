/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
  ],
  theme: {
    extend: {
      boxShadow: {
          'custom-light': `0px 0px 20px rgba(255, 255, 255, 0.5)`,
      },
  },
  },
}