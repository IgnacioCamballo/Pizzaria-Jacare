import {z} from "zod"
import { SubCategorySchema } from "./subCategoriesTypes"
import { ProductSchema } from "./types"

/** Categories */
export const CategorySchema = z.object({
  _id: z.string(),
  name: z.string(),
  orderN: z.number(),
  subCategories: z.array(SubCategorySchema),
  products: z.array(ProductSchema)
})

export const adminCategorySchema = z.array(
  CategorySchema.pick({
    _id: true,
    name: true,
    orderN: true,
    subCategories: true,
    products: true
  })
)

export type Category = z.infer<typeof CategorySchema>
export type CategoryData = Pick<Category, "name" | "orderN">
