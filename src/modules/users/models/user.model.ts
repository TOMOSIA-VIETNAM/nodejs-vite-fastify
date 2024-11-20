import { readerClient } from '../../../lib/prisma'
import type { User } from '../interfaces/user.interface'
import type { CreateUserDTO, UpdateUserDTO } from '../interfaces/user.interface'

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

  async create(data: CreateUserDTO): Promise<User> {
    // Kiểm tra email đã tồn tại chưa
    const existingUser = await this.findByEmail(data.email)
    if (existingUser) {
      throw new Error('Email already exists')
    }

    return readerClient.user.create({
      data: {
        email: data.email,
        name: data.name
      }
    })
  }

  async update(id: number, data: UpdateUserDTO): Promise<User> {
    // Kiểm tra user tồn tại
    const existingUser = await this.findById(id)
    if (!existingUser) {
      throw new Error('User not found')
    }

    // Nếu update email, kiểm tra email mới đã tồn tại chưa
    if (data.email && data.email !== existingUser.email) {
      const userWithEmail = await this.findByEmail(data.email)
      if (userWithEmail) {
        throw new Error('Email already exists')
      }
    }

    return readerClient.user.update({
      where: { id },
      data: {
        email: data.email,
        name: data.name
      }
    })
  }

  async delete(id: number): Promise<void> {
    // Kiểm tra user tồn tại
    const existingUser = await this.findById(id)
    if (!existingUser) {
      throw new Error('User not found')
    }

    await readerClient.user.delete({
      where: { id }
    })
  }
}
