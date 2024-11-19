import { fastify as Fastify, FastifyServerOptions } from 'fastify'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastifyCors from '@fastify/cors'
import fastifyHelmet from '@fastify/helmet'
import fastifyRateLimit from '@fastify/rate-limit'
import fastifyJwt from '@fastify/jwt'

import { env } from './config/environment'
import { errorHandler } from './shared/middlewares/error-handler'
import { setupRoutes } from './modules/setup-routes'
import { swaggerOptions, swaggerUiOptions } from './config/swagger'

export default async function buildApp(opts: FastifyServerOptions = {}) {
  const app = Fastify({
    ...opts,
    ajv: {
      customOptions: {
        removeAdditional: 'all',
        coerceTypes: true,
        useDefaults: true
      }
    }
  })

  // Register plugins
  await app.register(fastifyHelmet)
  await app.register(fastifyCors)
  await app.register(fastifyRateLimit, {
    max: env.RATE_LIMIT,
    timeWindow: env.RATE_LIMIT_TIMEWINDOW
  })
  await app.register(fastifyJwt, {
    secret: env.JWT_SECRET
  })

  // Register Swagger if not in production
  if (env.NODE_ENV !== 'production') {
    await app.register(fastifySwagger, swaggerOptions)
    await app.register(fastifySwaggerUi, swaggerUiOptions)
  }

  // Setup error handler
  app.setErrorHandler(errorHandler)

  // Setup routes
  setupRoutes(app)

  return app
}
