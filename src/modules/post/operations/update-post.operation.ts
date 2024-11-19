import { PostModel } from '../models/post.model'
import { UpdatePostDTO } from '../interfaces/post.interface'

export class UpdatePostOperation {
  private postModel: PostModel

  constructor() {
    this.postModel = new PostModel()
  }

  async execute(id: number, data: UpdatePostDTO) {
    // Check if post exists
    const post = await this.postModel.findById(id)
    if (!post) {
      throw new Error('Post not found')
    }

    // Validate update data
    await this.validateUpdate(data)

    // Update post
    return this.postModel.update(id, data)
  }

  private async validateUpdate(data: UpdatePostDTO) {
    // Add update validation logic here
  }
}
