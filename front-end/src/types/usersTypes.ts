import {z} from "zod"

export const userSchema = z.object({
  name: z.string(),
  password: z.string(),
  rank: z.number()
})

export type User = z.infer<typeof userSchema>
export type UserFormData = Pick<User, "name" | "password">

export const userAuthSchema = userSchema.pick({
  name: true,
  rank: true
}).extend({
  _id: z.string()
})

export type AuthUser = z.infer<typeof userAuthSchema>