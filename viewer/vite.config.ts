import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    // Relative base so the built viewer works under ANY path
    // (Netlify root, GitHub Pages project page, subfolder, your own domain).
    base: "./",
    plugins: [react({
        babel: {
            parserOpts: {
                plugins: ['decorators-legacy']
            }
        }
    })],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src")
        },
    },
});
