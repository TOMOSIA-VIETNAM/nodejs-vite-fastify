import { writerClient, readerClient } from '../../../lib/prisma'
import { CreatePostDTO, UpdatePostDTO, Post } from '../interfaces/post.interface'
import type { User } from '../../users/interfaces/user.interface'

export class PostModel {
  async create(data: CreatePostDTO): Promise<Post> {
    // Verify user exists in reader database
    const user = await readerClient.user.findUnique({
      where: { id: data.authorId }
    })

    if (!user) {
      throw new Error('User not found in reader database')
    }

    // Create post in writer database
    const post = await writerClient.post.create({
      data: {
        title: data.title,
        content: data.content,
        published: data.published ?? false,
        authorId: user.id
      }
    })

    return {
      ...post,
      author: user
    }
  }

  async findById(id: number): Promise<Post | null> {
    const post = await writerClient.post.findUnique({
      where: { id }
    })

    if (!post) return null

    // Get author from reader database
    const author = await readerClient.user.findUnique({
      where: { id: post.authorId }
    })

    return {
      ...post,
      author: author || undefined
    }
  }

  async findAll(): Promise<Post[]> {
    const posts = await writerClient.post.findMany()

    if (posts.length === 0) return []

    // Get unique author IDs
    const authorIds = [...new Set(posts.map(post => post.authorId))]

    // Get all authors in one query
    const authors = await readerClient.user.findMany({
      where: {
        id: {
          in: authorIds
        }
      }
    })

    // Map authors to posts
    return posts.map(post => ({
      ...post,
      author: authors.find(author => author.id === post.authorId)
    }))
  }

  async update(id: number, data: UpdatePostDTO): Promise<Post> {
    // If authorId is being updated, verify new user exists
    if (data.authorId) {
      const user = await readerClient.user.findUnique({
        where: { id: data.authorId }
      })

      if (!user) {
        throw new Error('New author not found in reader database')
      }
    }

    const post = await writerClient.post.update({
      where: { id },
      data
    })

    // Get updated author info
    const author = await readerClient.user.findUnique({
      where: { id: post.authorId }
    })

    return {
      ...post,
      author: author || undefined
    }
  }

  async delete(id: number): Promise<void> {
    await writerClient.post.delete({
      where: { id }
    })
  }
}
