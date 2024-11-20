import { UserModel } from '../models/user.model'

export class GetUserOperation {
  private userModel: UserModel

  constructor() {
    this.userModel = new UserModel()
  }

  async execute(id: number) {
    const user = await this.userModel.findById(id)
    if (!user) {
      throw new Error('User not found')
    }
    return user
  }
}
