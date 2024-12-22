/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure this points to your components
  ],
  theme: {
    extend: {
      keyframes: {
        breathe: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "-200% 0%" },
        },
        float: { // Add the float keyframes here
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
          "100%": { transform: "translateY(0px)" },
        },
      },
      animation: {
        breathe: "breathe 2s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        float: "float 3s ease-in-out infinite",
      },
      colors: { 
        'night-sky-start': '#1e3a8a', 
        'night-sky-mid1': '#3b82f6', 
        'night-sky-mid2': '#60a5fa', 
        'night-sky-end': '#1d4ed8',   
      },
    },
  },
  plugins: [],
};
