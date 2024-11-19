import { prisma } from '../../../lib/prisma'
import { CreateUserDTO, UpdateUserDTO } from '../interfaces/user.interface'

export class UserModel {
  async create(data: CreateUserDTO) {
    return prisma.user.create({
      data
    })
  }

  async findById(id: number) {
    return prisma.user.findUnique({
      where: { id }
    })
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email }
    })
  }

  async findAll() {
    return prisma.user.findMany()
  }

  async update(id: number, data: UpdateUserDTO) {
    return prisma.user.update({
      where: { id },
      data
    })
  }

  async delete(id: number) {
    return prisma.user.delete({
      where: { id }
    })
  }
}
