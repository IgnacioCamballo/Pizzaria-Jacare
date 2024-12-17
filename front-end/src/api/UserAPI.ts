import { isAxiosError } from "axios";
import api from "../lib/axios";
import { FullUser, User, userAuthSchema, UserFormData, usersAuthSchema } from "../types/usersTypes";

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

//Autenticates user when loging in
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

//Checks if user is authorised when entering to an admin page
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

export async function getUserById(currentId: FullUser["_id"]) {
  try {
    const {data} = await api(`/auth/current/${currentId}`)

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

type updateUserProps = {
  formData: {name: string, password?: string, rank: number, isPass: boolean}
  id: string
}

export async function UpdateUser(formDataId: updateUserProps) {
  const token = sessionStorage.getItem("AUTH_TOKEN")
  
  try {
    const {data} = await api.put(`/auth/${formDataId.id}`, formDataId.formData, {
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