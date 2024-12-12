import { isAxiosError } from "axios";
import api from "../lib/axios";
import { User, userAuthSchema, UserFormData } from "../types/usersTypes";

export async function createUser(formData: User) {
  try {
    const {data} = await api.post("/auth", formData)
    return data
  } catch (error) {
    if(isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function authenticateUser(formData: UserFormData) {
  try {
    const {data} = await api.post("/auth/login", formData)

    sessionStorage.setItem("AUTH_TOKEN", data)
    return data
  } catch (error) {
    if(isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function getUser() {
  const token = sessionStorage.getItem("AUTH_TOKEN")

  try {
    const {data} = await api("/auth/user", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const response = userAuthSchema.safeParse(data)
    if(response.success) {
      return response.data
    }
  } catch (error) {
    if(isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
  
}