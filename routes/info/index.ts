import { Hono } from 'hono'

const routes = new Hono()

routes.get('/', (c) => c.json({ message: 'simple-bun-vue-template' }))

export default routes
