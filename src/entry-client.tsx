import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from './components/ConnexionInscription/AuthContext';

// Vérifiez que l'élément #app existe
const rootElement = document.getElementById('app');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <AuthProvider> {/* Envelopper avec AuthProvider */}
        <App />
      </AuthProvider>
    </React.StrictMode>
  );
} else {
  console.error("Impossible de trouver l'élément #app");
}
