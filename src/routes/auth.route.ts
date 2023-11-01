import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import {handleValidationErrors} from "../middlewares/handleValidationErrors.middleware";
import {authSingupValidators,authLoginValidators} from "../middlewares/validators/userValidators";

const router = Router();

// crear usuario
router.post( "/signup", ...authSingupValidators, handleValidationErrors, authController.signup);

// iniciar sesion
router.post("/login", ...authLoginValidators, handleValidationErrors, authController.login);

export default router;