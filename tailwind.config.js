module.exports = {
  mode: "jit",
  content: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "facebook-blue": "#1877f2",
        "facebook-gray": "#f0f2f5",
        "facebook-green": "#42b72a",
        "facebook-strong-gray": "#e4e6eb",
        "facebook-gray-light": "#f2f2f2",
        "facebook-medium-gray":"#66696f"
      },
    },
    fontFamily: {
      Roboto: ["Roboto", "sans-serif"],
    },
  },
};
