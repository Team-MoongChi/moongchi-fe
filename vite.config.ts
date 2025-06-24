import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // 여기 포트 번호 바꿔줌
    proxy: {
      "/ws/chat": {
        target: "https://moong-chi.kro.kr",
        changeOrigin: true,
        ws: true,
        secure: false,
      },
    },
  },
  define: {
    global: "globalThis",
  },
});
