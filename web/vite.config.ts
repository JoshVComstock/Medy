import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
  },
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "./src/assets/"),
      "@": path.resolve(__dirname, "./src/"),
    },
  },
});
