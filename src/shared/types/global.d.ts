/// <reference types="node" />
/// <reference types="vite/client" />
/// <reference types="vitest/globals" />

declare module 'fastify' {
  export * from '@fastify/type-provider-json-schema-to-ts'
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: { id: number; email: string }
    user: {
      id: number
      email: string
    }
  }
}
