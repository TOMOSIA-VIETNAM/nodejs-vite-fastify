import { FastifyInstance as BaseFastifyInstance, FastifyBaseLogger, RawReplyDefaultExpression, RawRequestDefaultExpression, RawServerDefault } from 'fastify'

declare module 'fastify' {
  export interface FastifyInstance extends BaseFastifyInstance {
    register: Function;
    get: Function;
    post: Function;
    put: Function;
    patch: Function;
    delete: Function;
    authenticate: () => void;
  }

  export interface FastifyRequest<T = any> {
    params: T extends { Params: infer P } ? P : never;
    query: T extends { Querystring: infer Q } ? Q : never;
    body: T extends { Body: infer B } ? B : never;
  }
}
