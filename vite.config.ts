import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// FIXME:vite-path-alias追加する

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      scopeBehaviour: "local",
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/scss/index.scss";`,
      },
    },
  },
  resolve: {
    alias: {
      "@/": path.join(__dirname, "./src/"),
    },
  },
});
