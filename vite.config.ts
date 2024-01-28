import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    lib: {
      entry: resolve(__dirname, "lib/main.ts"),
      fileName: "library",
      formats: ["cjs", "es"],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled into your library
      external: ["react", "react-dom"],
      output: {
        // provide global variables to use in the UMD build for externalized deps
        globals: {
          react: "React",
          "react-dom": "React-dom",
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
