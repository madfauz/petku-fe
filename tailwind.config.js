/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-grey": "#757575",
        "subtle-grey": "#CCCCCC",
        "subtle-white": "#F9F9F9",
        "subtle-yellow": "#FFC06F",
        "light-brown": "#FFBB64",
        "light-green": "#32C788",
        "light-yellow": "#FFBB64",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        jakarta: ['"Plus Jakarta Sans"', "sans-serif"],
        fredoka: ['"Fredoka"', "sans-serif"],
      },
      backgroundImage: {
        "dashboard-image":
          "url('https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        "artikel-image":
          "url('https://images.pexels.com/photos/5264088/pexels-photo-5264088.jpeg?_gl=1*10sliay*_ga*MTk0NTA1OTQyNS4xNzkwMTUxMzkz*_ga_8JE65Q40S6*czE3OTAxNTEzOTIkbzEkZzEkdDE3OTAxNTE0MDQkajQ4JGwwJGgw')",
        "hewan-image":
          "url('https://images.pexels.com/photos/573293/pexels-photo-573293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        "praktek-image":
          "url('https://images.pexels.com/photos/6235013/pexels-photo-6235013.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [],
};
