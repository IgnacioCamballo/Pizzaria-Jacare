import { Request, Response } from "express";
import bcrypt from "bcrypt"
import User from "../models/User";
import { generateJWT } from "../utils/jwt";

export class AuthController {
  static createUser = async (req: Request, res: Response) => {
    try {
      const user = new User(req.body)
      const {name, password} = req.body

      const userExist = await User.findOne({name})
      if(userExist) {
        const error = new Error("El usuario ya existe")
        res.status(409).json({error: error.message})
        return
      }

      //Hash Password
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)
      
      await user.save()
      res.json("Usuario creado correctamente")
    } catch (error) {
      res.status(500).json({error: "Hubo un error"})
    }
  }

  static getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await User.find({}).select("_id name rank")
      res.json(users)
    } catch (error) {
      console.log(error)
    }
  }
  
  static getUserById = async (req: Request, res: Response) => {
    const {id} = req.params

    try {
      const user = await User.findById(id)

      if(!user) {
        const error = new Error('Categoría no encontrada')
        res.status(404).json({error: error.message})
        return
      }

      res.json(user)
    } catch (error) {
      console.log(error)
    }
  }

  static login = async (req: Request, res: Response) => {
    try {
      const {name, password} = req.body
      const user = await User.findOne({name})

      //checks if user exist in db
      if(!user) {
        const error = new Error("Usuario no encontrado")
        res.status(404).json({error: error.message})
        return
      }

      //compares db password with input passpword
      const isPasswordCorrect = await bcrypt.compare(password, user.password)
      if(!isPasswordCorrect) {
        const error = new Error("Contraseña incorrecta")
        res.status(401).json({error: error.message})
        return
      }
      const token = generateJWT({id: user.id})

      res.json(token)
    } catch (error) {
      res.status(500).json({error: "Hubo un error"})
    }
  }

  static user = async (req: Request, res: Response) => {
    res.json(req.user)
  }

  static deleteUser = async (req: Request, res: Response) => {
    const {deletingUser} = req.params
    const {user} = req.body

    if(user._id !== 1) {
      res.send("Acción no permitida")
      return
    }

    try {
      const userToDelete = await User.findById(deletingUser)

      if(!userToDelete) {
        const error = new Error('Usuario inexistente')
        res.status(404).json({error: error.message})
        return
      }

      await userToDelete.deleteOne()
      res.send("Usuario eliminada")
    } catch (error) {
      console.log(error)
    }
  }
}