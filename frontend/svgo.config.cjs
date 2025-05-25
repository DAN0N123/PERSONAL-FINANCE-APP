module.exports = {
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          // These preserve important attributes
          removeUselessStrokeAndFill: false,
          removeUnknownsAndDefaults: false,
          removeViewBox: false,
        },
      },
    },
    {
      name: "removeAttrs",
      params: {
        attrs: "(fill|stroke)",
      },
    },
  ],
};
