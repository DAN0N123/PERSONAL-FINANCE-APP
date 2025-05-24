// svgo.config.js
module.exports = {
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          // ⛔️ Don't remove fill/stroke info
          removeUnknownsAndDefaults: false,
          removeUselessStrokeAndFill: false,
          cleanupIDs: true,
          removeViewBox: false,
        },
      },
    },
    // Optional: Keep style attributes if needed
    "removeDimensions", // optional
    "convertStyleToAttrs", // inline <style> -> attributes
  ],
};
