/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    fontFamily: {
      sans: [
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI Variable Text",
        "Roboto",
        "Helvetica",
        "Arial",
        "Noto Sans",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Variable Emoji",
        "Segoe UI Variable Symbol",
        "Noto Color Emoji"
      ],
      mono: [
        "ui-monospace",
        "SFMono-Regular",
        "Menlo",
        "Monaco",
        "Cascadia Mono",
        "Liberation Mono",
        "Courier New",
        "monospace"
      ]
    },
    extend: {}
  },
  plugins: []
};
