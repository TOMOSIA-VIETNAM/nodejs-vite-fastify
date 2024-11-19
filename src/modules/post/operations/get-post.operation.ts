import { PostModel } from '../models/post.model'

export class GetPostOperation {
  private postModel: PostModel

  constructor() {
    this.postModel = new PostModel()
  }

  async execute(id: number) {
    const post = await this.postModel.findById(id)
    if (!post) {
      throw new Error('Post not found')
    }
    return post
  }
}
