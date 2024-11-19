import { FastifyInstance } from 'fastify'
import { HealthController } from './controllers/health.controller'

export async function healthRoutes(fastify: FastifyInstance) {
  const controller = new HealthController()

  // Root route
  fastify.get('/', controller.root.bind(controller))

  // Health check route
  fastify.get('/health', controller.check.bind(controller))
}
