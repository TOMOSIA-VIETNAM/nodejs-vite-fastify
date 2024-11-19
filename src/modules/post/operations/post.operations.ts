import { PostModel } from '../models/post.model'
import { CreatePostDTO, UpdatePostDTO } from '../interfaces/post.interface'

export class PostOperations {
  private postModel: PostModel

  constructor() {
    this.postModel = new PostModel()
  }

  async createPost(data: CreatePostDTO) {
    return this.postModel.create(data)
  }

  async getPost(id: number) {
    const post = await this.postModel.findById(id)
    if (!post) {
      throw new Error('Post not found')
    }
    return post
  }

  async getAllPosts() {
    return this.postModel.findAll()
  }

  async updatePost(id: number, data: UpdatePostDTO) {
    await this.getPost(id) // Verify post exists
    return this.postModel.update(id, data)
  }

  async deletePost(id: number) {
    await this.getPost(id) // Verify post exists
    return this.postModel.delete(id)
  }
}
