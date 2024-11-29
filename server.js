// server.js
import express from 'express'
import { createServer } from 'vite'
import fs from 'fs'
import path from 'path'

const app = express()

async function start() {
  const vite = await createServer({
    server: { middlewareMode: true }
  })

  // Utiliser Vite comme middleware
  app.use(vite.middlewares)

  // Servir toutes les requêtes avec SSR
  app.all('*', async (req, res) => {
    const url = req.originalUrl

    try {
      // Charger le template HTML
      const template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')

      // Utiliser Vite pour transformer le HTML
      const transformedTemplate = await vite.transformIndexHtml(url, template)

      // Charger le module de l'entrée serveur (render)
      const { render } = await vite.ssrLoadModule('/src/entry-serverr.tsx')

      // Rendre l'application côté serveur
      const appHtml = render(url)

      // Envoyer le HTML avec les données dynamiques
      res.status(200).set({ 'Content-Type': 'text/html' }).end(transformedTemplate.replace('<!--app-html-->', appHtml))
    } catch (e) {
      vite.ssrFixStacktrace(e)
      res.status(500).send(e.stack)
    }
  })

  app.listen(3000, () => {
    console.log('SSR app running at http://localhost:3000')
  })
}

start()
