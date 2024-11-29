import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    ssr: 'src/entry-serverr.tsx', // Spécifie l'entrée côté serveur
    outDir: 'dist', // Dossier de sortie pour les fichiers générés
  },
  server: {
    fs: {
      allow: [path.resolve(__dirname)], // Autorise l'accès au répertoire racine
    },
  },
});
