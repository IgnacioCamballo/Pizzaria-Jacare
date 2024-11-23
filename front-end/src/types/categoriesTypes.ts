import {z} from "zod"

/** Categories */
export const CategorySchema = z.object({
  _id: z.string(),
  name: z.string(),
  orderN: z.number(),
  subCategories: z.array(z.string())
})

export const adminCategorySchema = z.array(
  CategorySchema.pick({
    _id: true,
    name: true,
    orderN: true,
    subCategories: true
  })
)

export type Category = z.infer<typeof CategorySchema>
export type CategoryData = Pick<Category, "name" | "orderN">