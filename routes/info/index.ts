import { Hono } from 'hono'

const routes = new Hono()

routes.get('/', (c) => c.json({ message: 'ONE AI' }))

export default routes
