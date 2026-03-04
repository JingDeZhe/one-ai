import { Hono } from 'hono'
import routes from './routes'
import { serveStatic } from 'hono/bun'

const app = new Hono()

app.route('/api', routes)

app.use('/app/*', serveStatic({ root: './public' }))
app.get('/', (c) => c.redirect('/app/'))
app.get('/app', (c) => c.redirect('/app/'))
app.get('/app/*', serveStatic({ path: './public/app/index.html' }))

const port = 3000
console.log(`🚀 Server running on http://localhost:${port}`)
Bun.serve({
  port,
  fetch: app.fetch,
})
