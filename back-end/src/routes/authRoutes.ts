import { Router } from "express";
import { body } from "express-validator";
import { AuthController } from "../controllers/AuthController";
import { handleInputErrors } from "../middleware/validation";
import { authentication } from "../middleware/authentication";

const router = Router()

router.post("/", 
  body("name").notEmpty().withMessage("EL nombre es obligatorio"),
  body("password").isLength({min: 8}).withMessage("La contraseña es muy corta, minimo 8 caracteres"),
  handleInputErrors,
  AuthController.createUser
)

router.post("/login",
  body("name").notEmpty().withMessage("EL nombre es obligatorio"),
  body("password").notEmpty().withMessage("La contraseña es obligatoria"),
  handleInputErrors,
  AuthController.login
)

router.get("/",
  AuthController.getAllUsers
)

router.get("/user",
  authentication,
  AuthController.user
)

export default router