/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary': '#10B981', // Emerald-500
        'secondary': '#3B82F6', // Blue-500
        'accent': '#F97316', // Orange-500
        'neutral-light': '#F3F4F6', // Gray-100
        'neutral-dark': '#1F2937', // Gray-800
      },
    },
  },
  plugins: [],
}
// This is a Tailwind CSS configuration file that specifies the content paths
// to scan for class names, extends the default theme, and includes no plugins.