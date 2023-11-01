import { check, ValidationChain } from "express-validator";



export const productValidators: Array<ValidationChain> = [
  check("nombre").isLength({ min: 3}).isLength({max:20}).withMessage("El nombre del producto es obligatorio"),
  check("descripcion").isLength({ min: 10}).withMessage("La descripcion debe tener al menos 10 caracteres"),
  check("precio")
  .isFloat({ min: 0 })
  .withMessage("El precio no puede ser negativo"),
    check("imagenUrl").isURL().withMessage("la imagen es obligatoria y debe ser una URL"),
];
export const mongoIdValidator:Array<ValidationChain> = [
check("id").isMongoId().withMessage("El ID no es válido")];
