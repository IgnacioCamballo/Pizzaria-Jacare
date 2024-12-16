import {z} from "zod"

/** SubCategories */

export const SubCategorySchema = z.object({
  _id: z.string(),
  nameSub: z.string(),
  orderNsub: z.number(),
  category: z.string()
})

export const adminSubCategorySchema = z.array(
  SubCategorySchema.pick({
    _id: true,
    nameSub: true,
    orderNsub: true,
    category: true
  })
)

export type SubCategory = z.infer<typeof SubCategorySchema>
export type SubCategoryData = Pick<SubCategory, "nameSub" | "orderNsub">