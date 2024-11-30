import {z} from "zod"

/** SubCategories */

export const SubCategorySchema = z.object({
  _id: z.string(),
  nameSub: z.string(),
  orderNsub: z.number(),
  category: z.string(),
  priceSmall: z.number().optional(),
  priceBig: z.number().optional()
})

export const adminSubCategorySchema = z.array(
  SubCategorySchema.pick({
    _id: true,
    nameSub: true,
    orderNsub: true,
    category: true,
    priceSmall: true,
    priceBig: true
  })
)

export type SubCategory = z.infer<typeof SubCategorySchema>
export type SubCategoryData = Pick<SubCategory, "nameSub" | "orderNsub" | "priceSmall" | "priceBig">