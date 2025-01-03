export interface User {
  id: number
  email: string
  name: string | null
  createdAt: Date
  updatedAt: Date
}

export interface CreateUserDTO {
  email: string
  name: string
}

export interface UpdateUserDTO {
  email?: string
  name?: string
}
