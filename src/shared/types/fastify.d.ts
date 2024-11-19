import { FastifyInstance as BaseFastifyInstance } from 'fastify'

declare module 'fastify' {
  export interface FastifyInstance extends BaseFastifyInstance {
    authenticate: () => void;
  }
}
