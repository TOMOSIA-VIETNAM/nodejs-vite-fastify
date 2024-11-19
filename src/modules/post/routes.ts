import { FastifyInstance } from 'fastify'
import { PostController } from './controllers/post.controller'
import { createPostSchema, updatePostSchema } from './schemas/post.schema'

export async function postRoutes(fastify: FastifyInstance) {
  const controller = new PostController()

  fastify.post(
    '/',
    {
      schema: {
        body: createPostSchema
      }
    },
    controller.create.bind(controller)
  )

  fastify.get(
    '/:id',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' }
          }
        }
      }
    },
    controller.getOne.bind(controller)
  )

  fastify.get('/', controller.getAll.bind(controller))

  fastify.patch(
    '/:id',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' }
          }
        },
        body: updatePostSchema
      }
    },
    controller.update.bind(controller)
  )

  fastify.delete(
    '/:id',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' }
          }
        }
      }
    },
    controller.delete.bind(controller)
  )
}
