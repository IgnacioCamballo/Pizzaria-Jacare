import { isAxiosError } from "axios";
import api from "../lib/axios";

export async function updateImage(image: string) {
  try {
    const {data} = await api.post("/cloudinary", {image})
    return data
  } catch (error) {
    if(isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function deleteImage(public_id: string) {
  try {
    const {data} = await api.delete(`/cloudinary/${public_id}`)
    return data
  } catch (error) {
    if(isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}