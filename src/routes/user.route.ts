import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import {mongoIdValidator, authSingupValidators} from "../middlewares/validators/userValidators";
import { handleValidationErrors } from "../middlewares/handleValidationErrors.middleware";



const router = Router().use(authMiddleware);

// OBTENER TODOS
router.get("/", userController.index);
// CREAR
router.post("/", ...authSingupValidators, handleValidationErrors, userController.create);
// OBTENER UNO
router.get("/:id", ...mongoIdValidator, handleValidationErrors, userController.show);
// BORRAR
router.delete("/:id", ...mongoIdValidator, handleValidationErrors, userController.destroy);

export default router;