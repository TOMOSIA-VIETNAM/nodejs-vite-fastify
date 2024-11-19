import { FastifyReply, FastifyRequest } from 'fastify'
import '@fastify/jwt'

declare module 'fastify' {
  interface FastifyRequest {
    jwtVerify: () => Promise<any>
  }
}

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    await request.jwtVerify()
  } catch (err) {
    reply.status(401).send({
      statusCode: 401,
      error: 'Unauthorized',
      message: 'Invalid token'
    })
  }
}
