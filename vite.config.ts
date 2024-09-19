import { vercelToolbar } from "@vercel/toolbar/plugins/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vercelToolbar({
      useDeploymentId: false,
    }),
  ],
});
