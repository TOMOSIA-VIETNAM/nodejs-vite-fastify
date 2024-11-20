import { UserModel } from '../models/user.model'
import { CreateUserDTO } from '../interfaces/user.interface'

export class CreateUserOperation {
  private userModel: UserModel

  constructor() {
    this.userModel = new UserModel()
  }

  async execute(data: CreateUserDTO) {
    // Check if email already exists
    const existingUser = await this.userModel.findByEmail(data.email)
    if (existingUser) {
      throw new Error('Email already exists')
    }

    // Create user
    return this.userModel.create(data)
  }
}
