import type { User } from '../../users/interfaces/user.interface'

export interface Post {
  id: number
  title: string
  content: string | null
  published: boolean
  authorId: number
  author?: User
  createdAt: Date
  updatedAt: Date
}

export interface CreatePostDTO {
  title: string
  content?: string | null
  published?: boolean
  authorId: number
}

export interface UpdatePostDTO {
  title?: string
  content?: string | null
  published?: boolean
  authorId?: number
}
