import { Router } from "express";
import { body, param } from "express-validator";
import { CategoryController } from "../controllers/CategoryControler";
import { handleInputErrors } from "../middleware/validation";

const router = Router()

router.post("/", 
  body("name")
    .notEmpty().withMessage("La categoría es obligatoria"),

  handleInputErrors,
  CategoryController.createCategory
)

router.get("/", CategoryController.getAllCategories)

router.delete("/:id", 
  param("id").isMongoId().withMessage("ID no valido"),

  handleInputErrors,
  CategoryController.deleteCategorie
)

export default router