/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*.html", "./assets/js/**/*.js"],
  theme: {
    extend: {
      colors: {
        linen: "#F6F2EA",
        sand: "#E8DFD1",
        clay: "#B4A08D",
        taupe: "#75695E",
        olive: "#7D8061",
        moss: "#5F6348",
        espresso: "#3D332C",
        ink: "#292622"
      },
      fontFamily: {
        display: ["Iowan Old Style", "Palatino Linotype", "Book Antiqua", "Palatino", "Georgia", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"]
      },
      boxShadow: {
        soft: "0 18px 55px rgba(61, 51, 44, 0.10)",
        lift: "0 24px 70px rgba(61, 51, 44, 0.14)"
      },
      letterSpacing: {
        label: "0.16em"
      }
    }
  },
  plugins: []
};
