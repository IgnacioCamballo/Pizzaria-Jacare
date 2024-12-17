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

export const usersAuthSchema = z.array(userAuthSchema)

export type AuthUser = z.infer<typeof userAuthSchema>

export const fullUserSchema = userSchema.extend({_id: z.string()})
export type FullUser = z.infer<typeof fullUserSchema>