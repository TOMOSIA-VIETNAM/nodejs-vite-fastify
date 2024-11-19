export const swaggerOptions = {
  swagger: {
    info: {
      title: 'Fastify API',
      description: 'API documentation',
      version: '1.0.0'
    },
    host: 'localhost',
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json']
  }
}

export const swaggerUiOptions = {
  routePrefix: '/documentation',
  exposeRoute: true
}
