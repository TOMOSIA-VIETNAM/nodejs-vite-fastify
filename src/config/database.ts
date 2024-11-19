import { PrismaClient } from '@prisma/client'

// Initialize Prisma Clients for both Reader and Writer
const prismaReader = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_READER_URL
    }
  }
})

const prismaWriter = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_WRITER_URL
    }
  }
})

// Create a service to handle database operations
export class DatabaseService {
  // Reader operations
  static async findUser(id: number) {
    return prismaReader.user.findUnique({
      where: { id }
    })
  }

  static async findPosts() {
    return prismaReader.post.findMany({
      include: { author: true }
    })
  }

  // Writer operations
  static async createUser(data: { email: string; name?: string }) {
    const [user, userWriter] = await Promise.all([
      // Write to both databases to maintain consistency
      prismaWriter.userWriter.create({ data }),
      prismaReader.user.create({ data })
    ])
    return user
  }

  static async createPost(data: { title: string; content?: string; authorId: number }) {
    const [post, postWriter] = await Promise.all([
      prismaWriter.postWriter.create({ data }),
      prismaReader.post.create({ data })
    ])
    return post
  }

  // Clean up resources
  static async disconnect() {
    await Promise.all([
      prismaReader.$disconnect(),
      prismaWriter.$disconnect()
    ])
  }
}
