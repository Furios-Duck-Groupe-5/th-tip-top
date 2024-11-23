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
    proxy: {
      '/': { // Redirige toutes les requêtes vers votre backend
        target: 'http://40.66.40.126:4003', // URL de votre backendeef
        changeOrigin: true, // Change l'origine de la requête pour correspondre au backend
        secure: false, // Si le backend utilise un certificat SSL auto-signé
      },
    },
  },
});