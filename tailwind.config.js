/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure this points to your components
  ],
  theme: {
    extend: {
      backgroundSize: {
        "400%": "400% 400%",
      },
      backdropBlur: {
        sm: "4px",
      },
      keyframes: {
        breathe: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "-200% 0%" },
        },
        float: {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
          "100%": { transform: "translateY(0px)" },
        },
        infiniteScroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(calc(-100% / 3.8))" },
        },
        fadeIn: {
          from: { opacity: 0, transform: "translateY(-10px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        gradientBG: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        gradient: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        infiniteScroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(calc(-100% / 3.8))" },
        },
      },
      animation: {
        breathe: "breathe 2s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        float: "float 3s ease-in-out infinite",
        infiniteScroll: "infiniteScroll 10s linear infinite",
        fadeIn: "fadeIn 0.3s ease-in-out",
        gradientBG: "gradientBG 8s ease infinite",
        gradient: "gradient 8s linear infinite",
        infiniteScroll: "infiniteScroll 10s linear infinite",
      },
      colors: {
        "night-sky-start": "#1e3a8a",
        "night-sky-mid1": "#3b82f6",
        "night-sky-mid2": "#60a5fa",
        "night-sky-end": "#1d4ed8",
      },
      scale: ["group-hover"],
      opacity: ["group-hover"],
      backdropBlur: ["hover"],
    },
  },
  plugins: [],
};
