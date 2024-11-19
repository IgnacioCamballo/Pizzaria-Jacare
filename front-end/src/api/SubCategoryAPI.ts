import { isAxiosError } from "axios";
import api from "../lib/axios";
import { adminSubCategorySchema, SubCategory, SubCategoryData } from "../types/subCategoriesTypes";


export async function createSubCategory(formData: SubCategoryData) {
  try {
    const {data} = await api.post(`/categories/${formData.category}/subCategory/`, formData)
    return data
  } catch (error) {
    if(isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function getSubCategories(category: string) {
  try {
    const { data } = await api(`/categories/${category}/subCategory/`)
    const response = adminSubCategorySchema.safeParse(data)
    if(response.success) {return response.data}
  } catch (error) {
    if(isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

type updateSubCategoryProps = {
  formData: SubCategoryData,
  categoryId: SubCategory["_id"]
}

export async function updateSubCategory({formData, categoryId}: updateSubCategoryProps) {
  try {
    const { data } = await api.put<string>(`/categories/${formData.category}/subCategory/${categoryId}`, formData)
    return data
  } catch (error) {
    if(isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function deleteSubCategory(catId: SubCategory["category"], subId: SubCategory["_id"]) {
  try {
    const { data } = await api.delete<string>(`/categories/${catId}/subCategory/${subId}`)
    return data
  } catch (error) {
    if(isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}