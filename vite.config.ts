import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "vite-plugin-svgr";
import { VitePWA } from "vite-plugin-pwa";
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true, // 👈 important for localhost testing
      },
      manifest: {
        id: "/",
        name: "My App",
        short_name: "App",
        description: "My Vite PWA App",
        theme_color: "#0f172a",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        screenshots: [
          {
            src: "/screenshots/mobile.png",
            sizes: "540x720",
            type: "image/png",
            form_factor: "narrow",
          },
          {
            src: "/screenshots/desktop.png",
            sizes: "1280x720",
            type: "image/png",
            form_factor: "wide",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import path from "path";
// import svgr from "vite-plugin-svgr";
// export default defineConfig({
//   plugins: [react(), svgr()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "src"),
//     },
//   },
// });
