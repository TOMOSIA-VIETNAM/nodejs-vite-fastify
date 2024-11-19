import { FastifyRequest, FastifyReply } from 'fastify'
import { DatabaseService } from '../../config/database'

export async function createUser(
  request: FastifyRequest<{ Body: { email: string; name?: string } }>,
  reply: FastifyReply
) {
  try {
    const user = await DatabaseService.createUser(request.body)
    return reply.code(201).send(user)
  } catch (error) {
    request.log.error(error)
    return reply.code(500).send({ error: 'Internal Server Error' })
  }
}

export async function getUser(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const user = await DatabaseService.findUser(parseInt(request.params.id))
    if (!user) {
      return reply.code(404).send({ error: 'User not found' })
    }
    return user
  } catch (error) {
    request.log.error(error)
    return reply.code(500).send({ error: 'Internal Server Error' })
  }
}
