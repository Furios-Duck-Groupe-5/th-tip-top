import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './App';

export function createPage(url: string) {
    const appHtml = ReactDOMServer.renderToString(<App />);
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vite SSR App</title>
</head>
<body>
  <div id="root">${appHtml}</div>
</body>
</html>`;
}
