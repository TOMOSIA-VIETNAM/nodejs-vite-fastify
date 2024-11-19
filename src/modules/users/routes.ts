import { FastifyInstance } from 'fastify'
import { UserController } from './controllers/user.controller'
import { createUserSchema, updateUserSchema } from './schemas/user.schema'

export async function userRoutes(fastify: FastifyInstance) {
  const controller = new UserController()

  fastify.post('/', {
    schema: {
      body: createUserSchema,
      response: {
        201: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            email: { type: 'string' },
            name: { type: 'string' },
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
      body: updateUserSchema
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
