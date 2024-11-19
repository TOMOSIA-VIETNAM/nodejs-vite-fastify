import { z } from 'zod'

export const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100)
})

export const updateUserSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().min(1).max(100).optional()
})

export type CreateUserInput = z.infer<typeof createUserSchema>
export type UpdateUserInput = z.infer<typeof updateUserSchema>
