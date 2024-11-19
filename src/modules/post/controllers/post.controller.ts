import { FastifyRequest, FastifyReply } from 'fastify'
import { PostOperations } from '../operations/post.operations'
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
  private postOps: PostOperations

  constructor() {
    this.postOps = new PostOperations()
  }

  async create(request: FastifyRequest<CreatePostRequest>, reply: FastifyReply) {
    const post = await this.postOps.createPost(request.body)
    return reply.status(201).send(post)
  }

  async getOne(request: FastifyRequest<GetPostRequest>, reply: FastifyReply) {
    const post = await this.postOps.getPost(parseInt(request.params.id))
    return reply.send(post)
  }

  async getAll(request: FastifyRequest, reply: FastifyReply) {
    const posts = await this.postOps.getAllPosts()
    return reply.send(posts)
  }

  async update(request: FastifyRequest<UpdatePostRequest>, reply: FastifyReply) {
    const post = await this.postOps.updatePost(parseInt(request.params.id), request.body)
    return reply.send(post)
  }

  async delete(request: FastifyRequest<GetPostRequest>, reply: FastifyReply) {
    await this.postOps.deletePost(parseInt(request.params.id))
    return reply.status(204).send()
  }
}
