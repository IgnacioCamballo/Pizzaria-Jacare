import {z} from "zod"

export const SubCategorySchema = z.object({
  nameSub: z.string(),
  orderNSub: z.number()
})

export type SubCategory = z.infer<typeof SubCategorySchema>

export const CategorySchema = z.object({
  _id: z.string(),
  name: z.string(),
  orderN: z.number(),
  subCateg: z.array(SubCategorySchema).optional()
})

export const adminCategorySchema = z.array(
  CategorySchema.pick({
    _id: true,
    name: true,
    orderN: true,
    subCateg: true
  })
)

export type Category = z.infer<typeof CategorySchema>
export type CategoryData = Pick<Category, "name" | "orderN" | "subCateg">

