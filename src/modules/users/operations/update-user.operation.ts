import { UserModel } from '../models/user.model'
import { UpdateUserDTO } from '../interfaces/user.interface'

export class UpdateUserOperation {
  private userModel: UserModel

  constructor() {
    this.userModel = new UserModel()
  }

  async execute(id: number, data: UpdateUserDTO) {
    // Check if user exists
    const user = await this.userModel.findById(id)
    if (!user) {
      throw new Error('User not found')
    }

    // If email is being updated, check if new email is available
    if (data.email && data.email !== user.email) {
      const existingUser = await this.userModel.findByEmail(data.email)
      if (existingUser) {
        throw new Error('Email already exists')
      }
    }

    return this.userModel.update(id, data)
  }
}
