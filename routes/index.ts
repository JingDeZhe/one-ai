import { Hono } from 'hono'
import infoRoutes from './info/index.js'

const routes = new Hono()

routes.route('/info', infoRoutes)

export default routes
