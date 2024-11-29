import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './App';

export function render(url: string): string {
  // Rendu de l'application React côté serveur
  const html = ReactDOMServer.renderToString(<App />);
  
  // Construire la structure HTML pour la page
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Test SSR</title>
      </head>
      <body>
        <!-- Rendu SSR -->
        <div id="app">${html}</div>  

        <!-- Charger le script JavaScript pour la partie client -->
        <script type="module" src="/src/entry-client.js"></script> <!-- Change l'extension en .js si nécessaire -->
      </body>
    </html>
  `;
}
