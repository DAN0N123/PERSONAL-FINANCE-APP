import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "@svgr/rollup";

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgo: true,
      svgoConfig: {
        plugins: [
          {
            name: "preset-default",
            params: {
              overrides: {
                removeUselessStrokeAndFill: false,
                removeUnknownsAndDefaults: false,
                removeViewBox: false, // keep viewBox for scaling
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
      },
      icon: true, // makes width/height 1em and fill="currentColor"
    }),
  ],
});
