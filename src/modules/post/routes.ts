import { FastifyInstance } from 'fastify'
import { PostController } from './controllers/post.controller'

export async function postRoutes(fastify: FastifyInstance) {
  const controller = new PostController()

  fastify.post('/', {
    schema: {
      body: {
        type: 'object',
        required: ['title', 'authorId'],
        properties: {
          title: { type: 'string', minLength: 1, maxLength: 255 },
          content: { type: 'string', nullable: true },
          published: { type: 'boolean', default: false },
          authorId: { type: 'number', minimum: 1 }
        }
      },
      response: {
        201: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            title: { type: 'string' },
            content: { type: 'string', nullable: true },
            published: { type: 'boolean' },
            authorId: { type: 'number' },
            author: {
              type: 'object',
              properties: {
                id: { type: 'number' },
                email: { type: 'string' },
                name: { type: 'string', nullable: true }
              }
            },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' }
          }
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
          content: { type: 'string', nullable: true },
          published: { type: 'boolean' },
          authorId: { type: 'number', minimum: 1 }
        },
        additionalProperties: false
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
