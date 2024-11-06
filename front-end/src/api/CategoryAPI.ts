import { isAxiosError } from "axios";
import api from "../lib/axios";
import { adminCategorySchema, Category, CategoryData } from "../types/categoriesTypes";


export async function createProduct(formData: CategoryData) {
  try {
    const {data} = await api.post("/categories", formData)
    return data
  } catch (error) {
    if(isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function getCategories() {
  try {
    const { data } = await api("/categories")
    const response = adminCategorySchema.safeParse(data)
    if(response.success) {return response.data}
  } catch (error) {
    if(isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

// type updateProductProps = {
//   formData: ProductForm,
//   productId: Product["_id"]
// }

// export async function updateProduct({formData, productId}: updateProductProps) {
//   try {
//     const { data } = await api.put<string>(`/products/${productId}`, formData)
//     return data
//   } catch (error) {
//     if(isAxiosError(error) && error.response) {
//       throw new Error(error.response.data.error)
//     }
//   }
// }

export async function deleteProduct(id: Category["_id"]) {
  try {
    const { data } = await api.delete<string>(`/categories/${id}`)
    return data
  } catch (error) {
    if(isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}