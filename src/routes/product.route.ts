import { Router } from "express";
import * as productController from "../controllers/product.controller";
import {productValidators,mongoIdValidator} from "../middlewares/validators/productValidator";
import { authMiddleware } from "../middlewares/auth.middleware";
import { handleValidationErrors } from "../middlewares/handleValidationErrors.middleware";


const router = Router();

// traer todos los productos
router.get("/", productController.index);
// crear un producto
router.post("/",...productValidators,handleValidationErrors, authMiddleware, productController.create);
// traer un producto
router.get("/:id", ...mongoIdValidator, handleValidationErrors, productController.show);
// eliminar
router.delete("/:id", handleValidationErrors, authMiddleware, productController.destroy);

export default router;