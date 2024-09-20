const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      container: {
        center: true, // Centers the container by default
        padding: {
          DEFAULT: "2rem", // Sets padding to 2rem for all screen sizes
        },
      },
    },
  },
  plugins: [],
});
