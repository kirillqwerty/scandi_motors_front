import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ command }) => {
  const isDev = command === "serve";

  return {
    plugins: [react()],
    base: isDev ? "/" : "/scandi_motors_front/",
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    server: {
      host: "localhost",
      port: 3000,
    },
  };
});
