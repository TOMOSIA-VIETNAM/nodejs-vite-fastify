import { readerClient } from '../../../lib/prisma'
import type { User } from '../interfaces/user.interface'

export class UserModel {
  async findById(id: number): Promise<User | null> {
    return readerClient.user.findUnique({
      where: { id }
    })
  }

  async findByEmail(email: string): Promise<User | null> {
    return readerClient.user.findUnique({
      where: { email }
    })
  }

  async findAll(): Promise<User[]> {
    return readerClient.user.findMany()
  }

  async create(): Promise<never> {
    throw new Error('Create operation not allowed on reader database')
  }

  async update(): Promise<never> {
    throw new Error('Update operation not allowed on reader database')
  }

  async delete(): Promise<never> {
    throw new Error('Delete operation not allowed on reader database')
  }
}
