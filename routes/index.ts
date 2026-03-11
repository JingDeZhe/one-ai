import { Hono } from 'hono'
import infoRoutes from './info/index.ts'
import aiRoutes from './ai/index.ts'

const routes = new Hono()

routes.route('/info', infoRoutes)
routes.route('/ai', aiRoutes)

export default routes
