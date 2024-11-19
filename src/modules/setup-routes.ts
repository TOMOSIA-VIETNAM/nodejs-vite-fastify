import { FastifyInstance } from 'fastify'
import { postRoutes } from './post/routes'

export function setupRoutes(app: FastifyInstance) {
  app.register(postRoutes, { prefix: '/api/v1/posts' })
}
