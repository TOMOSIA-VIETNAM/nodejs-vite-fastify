import { FastifyRequest, FastifyReply } from 'fastify'
import {
  CreateUserOperation,
  GetUserOperation,
  GetUsersOperation,
  UpdateUserOperation,
  DeleteUserOperation
} from '../operations'
import { CreateUserInput, UpdateUserInput } from '../schemas/user.schema'

interface CreateUserRequest {
  Body: CreateUserInput
}

interface GetUserRequest {
  Params: { id: string }
}

interface UpdateUserRequest {
  Params: { id: string }
  Body: UpdateUserInput
}

export class UserController {
  private createUserOp: CreateUserOperation
  private getUserOp: GetUserOperation
  private getUsersOp: GetUsersOperation
  private updateUserOp: UpdateUserOperation
  private deleteUserOp: DeleteUserOperation

  constructor() {
    this.createUserOp = new CreateUserOperation()
    this.getUserOp = new GetUserOperation()
    this.getUsersOp = new GetUsersOperation()
    this.updateUserOp = new UpdateUserOperation()
    this.deleteUserOp = new DeleteUserOperation()
  }

  async create(request: FastifyRequest<CreateUserRequest>, reply: FastifyReply) {
    try {
      const user = await this.createUserOp.execute(request.body)
      return reply.code(201).send(user)
    } catch (error: any) {
      request.log.error(error)
      if (error.message === 'Email already exists') {
        return reply.code(409).send({ error: error.message })
      }
      return reply.code(500).send({ error: 'Internal Server Error' })
    }
  }

  async getOne(request: FastifyRequest<GetUserRequest>, reply: FastifyReply) {
    try {
      const user = await this.getUserOp.execute(parseInt(request.params.id))
      return reply.send(user)
    } catch (error: any) {
      request.log.error(error)
      if (error.message === 'User not found') {
        return reply.code(404).send({ error: error.message })
      }
      return reply.code(500).send({ error: 'Internal Server Error' })
    }
  }

  async getAll(request: FastifyRequest, reply: FastifyReply) {
    try {
      const users = await this.getUsersOp.execute()
      return reply.send(users)
    } catch (error: any) {
      request.log.error(error)
      return reply.code(500).send({ error: 'Internal Server Error' })
    }
  }

  async update(request: FastifyRequest<UpdateUserRequest>, reply: FastifyReply) {
    try {
      const user = await this.updateUserOp.execute(
        parseInt(request.params.id),
        request.body
      )
      return reply.send(user)
    } catch (error: any) {
      request.log.error(error)
      if (error.message === 'User not found') {
        return reply.code(404).send({ error: error.message })
      }
      if (error.message === 'Email already exists') {
        return reply.code(409).send({ error: error.message })
      }
      return reply.code(500).send({ error: 'Internal Server Error' })
    }
  }

  async delete(request: FastifyRequest<GetUserRequest>, reply: FastifyReply) {
    try {
      await this.deleteUserOp.execute(parseInt(request.params.id))
      return reply.code(204).send()
    } catch (error: any) {
      request.log.error(error)
      if (error.message === 'User not found') {
        return reply.code(404).send({ error: error.message })
      }
      return reply.code(500).send({ error: 'Internal Server Error' })
    }
  }
}
