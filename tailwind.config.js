/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.jsx",
    "./resources/**/*.vue",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"), "prettier-plugin-tailwindcss"],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#0e7490",

          "secondary": "#22d3ee",

          "accent": "#f3f4f6",

          "neutral": "#414558",

          "base-100": "#374151",

          "info": "#f3f4f6",

          "success": "#4ade80",

          "warning": "#f59e0b",

          "error": "#ef4444",
        },
      },
    ],
  },
};
