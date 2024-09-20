import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Assurer que le type de l'élément est bien trouvé par TypeScript
const rootElement = document.getElementById('root');

// Vérifier si l'élément existe avant de créer le rendu
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Impossible de trouver l'élément root");
}
