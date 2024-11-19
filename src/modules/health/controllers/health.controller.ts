import { FastifyRequest, FastifyReply } from 'fastify'

export class HealthController {
  async check(request: FastifyRequest, reply: FastifyReply) {
    return reply.send({
      status: 'ok',
      timestamp: new Date().toISOString()
    })
  }

  async root(request: FastifyRequest, reply: FastifyReply) {
    return reply.send({
      name: 'Fastify API',
      version: '1.0.0',
      docs: '/documentation'
    })
  }
}
