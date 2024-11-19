import Fastify from 'fastify'
import type { FastifyServerOptions, FastifyInstance } from 'fastify'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import rateLimit from '@fastify/rate-limit'
import jwt from '@fastify/jwt'

import { env } from './config/environment'
import { errorHandler } from './shared/middlewares/error-handler'
import { setupRoutes } from './modules'
import { swaggerOptions, swaggerUiOptions } from './config/swagger'

export default async function buildApp(opts: FastifyServerOptions = {}): Promise<FastifyInstance> {
  const app = Fastify(opts)

  // Register plugins
  await app.register(helmet)
  await app.register(cors)
  await app.register(rateLimit, {
    max: env.RATE_LIMIT,
    timeWindow: env.RATE_LIMIT_TIMEWINDOW
  })
  await app.register(jwt, {
    secret: env.JWT_SECRET
  })

  // Register Swagger if not in production
  if (env.NODE_ENV !== 'production') {
    await app.register(swagger, swaggerOptions)
    await app.register(swaggerUi, swaggerUiOptions)
  }

  // Setup error handler
  app.setErrorHandler(errorHandler)

  // Setup routes
  setupRoutes(app)

  return app
}
