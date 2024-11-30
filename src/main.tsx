import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from './components/ConnexionInscription/AuthContext';
import { HelmetProvider } from 'react-helmet-async'; // Importer HelmetProvider

// Assurer que le type de l'élément est bien trouvé par TypeScript
const rootElement = document.getElementById('root');

// Vérifier si l'élément existe avant de créer le rendu
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <HelmetProvider> {/* Entourer l'application avec HelmetProvider */}
        <AuthProvider>
          <App />
        </AuthProvider>
      </HelmetProvider>
    </React.StrictMode>
  );
} else {
  console.error("Impossible de trouver l'élément root");
}
