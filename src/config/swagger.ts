export const swaggerOptions = {
  swagger: {
    info: {
      title: 'Fastify API',
      description: 'API documentation',
      version: '1.0.0'
    },
    host: 'localhost:3000',
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      { name: 'Health', description: 'Health check endpoints' },
      { name: 'Posts', description: 'Posts management endpoints' }
    ]
  }
}

export const swaggerUiOptions = {
  routePrefix: '/documentation',
  exposeRoute: true,
  swagger: {
    info: {
      title: 'Fastify API Documentation',
      description: 'API documentation',
      version: '1.0.0'
    }
  }
}
