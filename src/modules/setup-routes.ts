import { FastifyInstance } from 'fastify'
import { postRoutes } from './post/routes'
import { healthRoutes } from './health/routes'

export function setupRoutes(app: FastifyInstance) {
  app.register(healthRoutes)
  app.register(postRoutes, { prefix: '/api/v1/posts' })
}
