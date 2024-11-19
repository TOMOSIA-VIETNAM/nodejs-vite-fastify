import { prisma } from '../../../lib/prisma'
import { CreatePostDTO, UpdatePostDTO } from '../interfaces/post.interface'

export class PostModel {
  async create(data: CreatePostDTO) {
    return prisma.post.create({
      data
    })
  }

  async findById(id: number) {
    return prisma.post.findUnique({
      where: { id }
    })
  }

  async findAll() {
    return prisma.post.findMany()
  }

  async update(id: number, data: UpdatePostDTO) {
    return prisma.post.update({
      where: { id },
      data
    })
  }

  async delete(id: number) {
    return prisma.post.delete({
      where: { id }
    })
  }
}
