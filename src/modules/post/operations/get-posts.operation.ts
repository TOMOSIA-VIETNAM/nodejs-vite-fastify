import { PostModel } from '../models/post.model'

export class GetPostsOperation {
  private postModel: PostModel

  constructor() {
    this.postModel = new PostModel()
  }

  async execute() {
    return this.postModel.findAll()
  }
}
