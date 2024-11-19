import { FastifyInstance } from 'fastify'
import { postRoutes } from './post/routes'
import { healthRoutes } from './health/routes'

export async function setupRoutes(app: FastifyInstance) {
  await app.register(healthRoutes)
  await app.register(postRoutes, { prefix: '/api/v1/posts' })
}
