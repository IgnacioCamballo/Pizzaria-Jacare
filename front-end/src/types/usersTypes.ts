import {z} from "zod"

export const userSchema = z.object({
  _id: z.string(),
  name: z.string(),
  password: z.string(),
  rank: z.number()
})

export type User = z.infer<typeof userSchema>
export type UserFormData = Pick<User, "rank" | "name" | "password">
export type UserFormLogIn = Pick<User, "name" | "password">

export const userAuthSchema = userSchema.pick({
  name: true,
  rank: true,
  _id: true
})

export const usersAuthSchema = z.array(userAuthSchema)

export type AuthUser = z.infer<typeof userAuthSchema>