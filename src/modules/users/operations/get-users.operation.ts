import { UserModel } from '../models/user.model'

export class GetUsersOperation {
  private userModel: UserModel

  constructor() {
    this.userModel = new UserModel()
  }

  async execute() {
    return this.userModel.findAll()
  }
}
