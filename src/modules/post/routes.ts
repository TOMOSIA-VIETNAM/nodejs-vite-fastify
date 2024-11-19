import { FastifyInstance } from 'fastify'
import { PostController } from './controllers/post.controller'
import { createPostSchema, updatePostSchema } from './schemas/post.schema'

export async function postRoutes(fastify: FastifyInstance) {
  const controller = new PostController()

  fastify.post('/create', {
    schema: {
      body: {
        type: 'object',
        required: ['title', 'content', 'authorId'],
        properties: {
          title: { type: 'string', minLength: 1, maxLength: 255 },
          content: { type: 'string', minLength: 1 },
          published: { type: 'boolean', default: false },
          authorId: { type: 'number', minimum: 1 }
        }
      }
    }
  }, controller.create.bind(controller))

  fastify.get('/:id', {
    schema: {
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string', pattern: '^[0-9]+$' }
        }
      }
    }
  }, controller.getOne.bind(controller))

  fastify.get('/', controller.getAll.bind(controller))

  fastify.patch('/:id', {
    schema: {
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string', pattern: '^[0-9]+$' }
        }
      },
      body: {
        type: 'object',
        properties: {
          title: { type: 'string', minLength: 1, maxLength: 255 },
          content: { type: 'string', minLength: 1 },
          published: { type: 'boolean' }
        }
      }
    }
  }, controller.update.bind(controller))

  fastify.delete('/:id', {
    schema: {
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string', pattern: '^[0-9]+$' }
        }
      }
    }
  }, controller.delete.bind(controller))
}
