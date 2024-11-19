import { FastifyReply, FastifyRequest } from 'fastify'
import '@fastify/jwt'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: { id: number; email: string }
    user: {
      id: number
      email: string
    }
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
