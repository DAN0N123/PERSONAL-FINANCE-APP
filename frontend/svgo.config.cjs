module.exports = {
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          // disable removing fill attributes
          removeUnknownsAndDefaults: {
            keepAttrs: ["fill"],
          },
        },
      },
    },
    {
      name: "convertColors",
      params: {
        currentColor: true, // converts solid fills to currentColor
      },
    },
  ],
};
