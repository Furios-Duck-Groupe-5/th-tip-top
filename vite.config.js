import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      allow: [path.resolve(__dirname)], // Autorise l'accès au répertoire racine
    },
  },
});
