// https://vitejs.dev/guide/ssr#setting-up-the-dev-server
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import { createServer as createViteServer } from 'vite'
import dotenv from 'dotenv'
import { safeJsonStringify } from '@vercel/flags'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
console.log(path.resolve(__dirname, '.env.local'))
dotenv.config({
  path: path.resolve(__dirname, '.env.local'),
})

async function createServer() {
  const app = express()

  // Create Vite server in middleware mode and configure the app type as
  // 'custom', disabling Vite's own HTML serving logic so parent server
  // can take control
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom'
  })

  // Use vite's connect instance as middleware. If you use your own
  // express router (express.Router()), you should use router.use
  // When the server restarts (for example after the user modifies
  // vite.config.js), `vite.middlewares` is still going to be the same
  // reference (with a new internal stack of Vite and plugin-injected
  // middlewares). The following is valid even after restarts.
  app.use(vite.middlewares)

  app.use('*', async (req, res, next) => {
    if (req.originalUrl === '/.well-known/vercel/flags') {
      return res.json({
        "definitions": {
          "showCounter": {
            "description": "Show the counter widget",
            "options": [
              {"value": false, "name": "Off"},
              {"value": true, "name": "On"}
            ]
          }
        }
      })
    }

    const url = req.originalUrl
  
    try {
      // 1. Read index.html
      let template = fs.readFileSync(
        path.resolve(__dirname, 'index.html'),
        'utf-8',
      )
  
      // 2. Apply Vite HTML transforms. This injects the Vite HMR client,
      //    and also applies HTML transforms from Vite plugins, e.g. global
      //    preambles from @vitejs/plugin-react
      template = await vite.transformIndexHtml(url, template)
      
      // get server flags
      const { getFlags } = await vite.ssrLoadModule('/src/server-flags.tsx')
      const flags = await getFlags({
        cookie: req.headers.cookie,
      })
      // 5. Inject the app-rendered HTML into the template.
      const html = template.replace(
        `<!-- flag-overrides -->`,
        `<script type="application/json" id="flags">${flags}</script>`,
      ).replace(
        `<!-- settings -->`,
        `<script type="application/json" id="settings">${safeJsonStringify({
          branch: process.env.VERCEL_GIT_COMMIT_REF || 'main',
          projectId: process.env.VERCEL_TOOLBAR_PROJECT_ID,
          ownerId: process.env.VERCEL_TOOLBAR_OWNER_ID,
        })}</script>`,
      )
      // 6. Send the rendered HTML back.
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      // If an error is caught, let Vite fix the stack trace so it maps back
      // to your actual source code.
      vite.ssrFixStacktrace(e)
      next(e)
    }
  })  

  app.listen(process.env.PORT || 5173)
}

createServer()