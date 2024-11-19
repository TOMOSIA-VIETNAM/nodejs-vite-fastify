import '@fastify/jwt'
import { FastifyJWT } from '@fastify/jwt'

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: () => void
  }
}
