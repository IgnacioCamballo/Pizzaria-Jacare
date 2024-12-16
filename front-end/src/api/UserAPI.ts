import { isAxiosError } from "axios";
import api from "../lib/axios";
import { User, userAuthSchema, UserFormData, UserFormLogIn, usersAuthSchema } from "../types/usersTypes";

export async function createUser(formData: UserFormData) {
  try {
    const {data} = await api.post("/auth", formData)
    return data
  } catch (error) {
    if(isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function authenticateUser(formData: UserFormLogIn) {
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
    console.log(data)
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

export async function getUserById(currentId: User["_id"]) {
  try {
    const {data} = await api(`/auth/${currentId}`)
    return data
  } catch (error) {
    if(isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function getAllUsers() {
  try {
    const {data} = await api("/auth")

    const response = usersAuthSchema.safeParse(data)
    if(response.success) {
      return response.data
    }
  } catch (error) {
    if(isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function DeleteUser(user: string) {
  const token = sessionStorage.getItem("AUTH_TOKEN")

  try {
    const {data} = await api.delete(`/auth/${user}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return data
  } catch (error) {
    if(isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

