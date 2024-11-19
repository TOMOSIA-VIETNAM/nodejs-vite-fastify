import { PostModel } from '../models/post.model'
import { CreatePostDTO } from '../interfaces/post.interface'

export class CreatePostOperation {
  private postModel: PostModel

  constructor() {
    this.postModel = new PostModel()
  }

  async execute(data: CreatePostDTO) {
    // Validate business rules
    await this.validatePost(data)

    // Create post
    return this.postModel.create(data)
  }

  private async validatePost(data: CreatePostDTO) {
    // Add business validation logic here
    // Ví dụ: check duplicate title, validate content format, etc.
  }
}
