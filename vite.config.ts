import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // 여기 포트 번호 바꿔줌
    proxy: {
      "/socket": {
        target: "https://api.moong-chi.com",
        changeOrigin: true,
        ws: true,
        secure: false,
      },
      "/api/ml": {
        target: "https://tpho1z0cyzudy3-8080.proxy.runpod.net/api/v1",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/ml/, ""),
        secure: false, // HTTPS 인증서 무시 (필요 시)
      },
    },
  },
  define: {
    global: "globalThis",
  },
});
