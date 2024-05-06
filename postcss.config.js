module.exports = {
  plugins: [
    require("postcss-nested"), // This should come first
    require("tailwindcss"),
    require("autoprefixer"),
  ],
};
