import { isAxiosError } from "axios";
import api from "../lib/axios";
import { ProductSchema, Product, ProductForm } from "../types/types";


export async function createProduct(formData: ProductForm) {
  try {
    const {data} = await api.post("/products", formData)
    return data
  } catch (error) {
    if(isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function getProducts() {
  try {
    const { data } = await api("/products")
    const response = ProductSchema.safeParse(data)
    if(response.success) {return response.data}
  } catch (error) {
    if(isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function getProductById(id: Product["_id"]) {
  try {
    const { data } = await api(`/products/${id}`)
    return data
  } catch (error) {
    if(isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

type updateProductProps = {
  formData: ProductForm,
  productId: Product["_id"]
}

export async function updateProduct({formData, productId}: updateProductProps) {
  try {
    const { data } = await api.put<string>(`/products/${productId}`, formData)
    return data
  } catch (error) {
    if(isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function deleteProduct(id: Product["_id"]) {
  try {
    const { data } = await api.delete<string>(`/products/${id}`)
    return data
  } catch (error) {
    if(isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}