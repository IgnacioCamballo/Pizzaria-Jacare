import type { Request, Response } from "express"
import Category from "../models/Categories"


export class CategoryController {
  static createCategory = async (req: Request, res: Response) => {
    const category = new Category(req.body)

    try {
      await category.save()
      res.send("Categoría creada correctamente")
    } catch (error) {
      console.log(error)
    }
  }
  
  static getAllCategories = async (req: Request, res: Response) => {
    try {
      const categories = await Category.find({})
      res.json(categories)
    } catch (error) {
      console.log(error)
    }
  }

  static deleteCategorie = async (req: Request, res: Response) => {
    const {categoryId} = req.params

    try {
      const category = await Category.findById(categoryId)

      if(!category) {
        const error = new Error('Categoría no encontrada')
        res.status(404).json({error: error.message})
        return
      }

      await category.deleteOne()
      res.send("Categoría eliminada")
    } catch (error) {
      console.log(error)
    }
  }
}