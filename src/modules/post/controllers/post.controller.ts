import { FastifyRequest, FastifyReply } from 'fastify'
import {
  CreatePostOperation,
  GetPostOperation,
  GetPostsOperation,
  UpdatePostOperation,
  DeletePostOperation
} from '../operations'
import { CreatePostInput, UpdatePostInput } from '../schemas/post.schema'

interface CreatePostRequest {
  Body: CreatePostInput
}

interface GetPostRequest {
  Params: { id: string }
}

interface UpdatePostRequest {
  Params: { id: string }
  Body: UpdatePostInput
}

export class PostController {
  private createPostOp: CreatePostOperation
  private getPostOp: GetPostOperation
  private getPostsOp: GetPostsOperation
  private updatePostOp: UpdatePostOperation
  private deletePostOp: DeletePostOperation

  constructor() {
    this.createPostOp = new CreatePostOperation()
    this.getPostOp = new GetPostOperation()
    this.getPostsOp = new GetPostsOperation()
    this.updatePostOp = new UpdatePostOperation()
    this.deletePostOp = new DeletePostOperation()
  }

  async create(request: FastifyRequest<CreatePostRequest>, reply: FastifyReply) {
    const post = await this.createPostOp.execute(request.body)
    return reply.status(201).send(post)
  }

  async getOne(request: FastifyRequest<GetPostRequest>, reply: FastifyReply) {
    const post = await this.getPostOp.execute(parseInt(request.params.id))
    return reply.send(post)
  }

  async getAll(request: FastifyRequest, reply: FastifyReply) {
    const posts = await this.getPostsOp.execute()
    return reply.send(posts)
  }

  async update(request: FastifyRequest<UpdatePostRequest>, reply: FastifyReply) {
    const post = await this.updatePostOp.execute(
      parseInt(request.params.id),
      request.body
    )
    return reply.send(post)
  }

  async delete(request: FastifyRequest<GetPostRequest>, reply: FastifyReply) {
    await this.deletePostOp.execute(parseInt(request.params.id))
    return reply.status(204).send()
  }
}
