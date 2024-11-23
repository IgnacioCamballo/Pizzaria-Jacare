import { isAxiosError } from "axios";
import api from "../lib/axios";
import { adminSubCategorySchema, SubCategory, SubCategoryData } from "../types/subCategoriesTypes";

type SubCatCreateProps = {
  formData: SubCategoryData
  catId: SubCategory["category"],
}

export async function createSubCategory({formData, catId }: SubCatCreateProps) {
  try {
    const {data} = await api.post(`/categories/${catId}/subCategory/`, formData)
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

type SubCatUppdateProps = {
  formData: SubCategoryData
  catId: SubCategory["category"],
  subId: SubCategory["_id"]
}

export async function updateSubCategory({formData, catId, subId }: SubCatUppdateProps) {
  try {
    const { data } = await api.put<string>(`/categories/${catId}/subCategory/${subId}`, formData)
    return data
  } catch (error) {
    if(isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

type deleteSubCategoryProps = {
  catId: SubCategory["category"],
  subId: SubCategory["_id"]
}

export async function deleteSubCategory({catId, subId}: deleteSubCategoryProps) {
  try {
    const { data } = await api.delete<string>(`/categories/${catId}/subCategory/${subId}`)
    return data
  } catch (error) {
    if(isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}