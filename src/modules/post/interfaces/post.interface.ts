export interface Post {
  id: number
  title: string
  content: string
  published: boolean
  authorId: number
  createdAt: Date
  updatedAt: Date
}

export interface CreatePostDTO {
  title: string
  content: string
  published?: boolean
  authorId: number
}

export interface UpdatePostDTO {
  title?: string
  content?: string
  published?: boolean
}
