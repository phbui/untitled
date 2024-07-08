import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    build: {
      rollupOptions: {
        output: {
          entryFileNames: `index.js`,
        },
      },
      minify: true,
    },
    plugins: [react()],
    server: {
      cors: true,
    },
  };
});
