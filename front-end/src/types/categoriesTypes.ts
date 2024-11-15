import {z} from "zod"

/** Categories */
export const CategorySchema = z.object({
  _id: z.string(),
  name: z.string(),
  orderN: z.number(),
})

export const adminCategorySchema = z.array(
  CategorySchema.pick({
    _id: true,
    name: true,
    orderN: true
  })
)

export type Category = z.infer<typeof CategorySchema>
export type CategoryData = Pick<Category, "name" | "orderN">

