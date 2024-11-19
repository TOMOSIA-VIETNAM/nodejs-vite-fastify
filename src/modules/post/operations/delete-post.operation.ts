import { PostModel } from '../models/post.model'

export class DeletePostOperation {
  private postModel: PostModel

  constructor() {
    this.postModel = new PostModel()
  }

  async execute(id: number) {
    // Check if post exists
    const post = await this.postModel.findById(id)
    if (!post) {
      throw new Error('Post not found')
    }

    // Add any pre-deletion checks here
    await this.validateDeletion(id)

    return this.postModel.delete(id)
  }

  private async validateDeletion(id: number) {
    // Add deletion validation logic here
    // Ví dụ: check if user has permission, check related data, etc.
  }
}
