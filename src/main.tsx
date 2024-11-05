import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from './components/ConnexionInscription/AuthContext';

// Assurer que le type de l'élément est bien trouvé par TypeScript
const rootElement = document.getElementById('root');

// Vérifier si l'élément existe avant de créer le rendu
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </React.StrictMode>
  );
} else {
  console.error("Impossible de trouver l'élément root");
}
