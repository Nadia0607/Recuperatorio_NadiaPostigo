"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoIdValidator = exports.productValidators = void 0;
const express_validator_1 = require("express-validator");
exports.productValidators = [
    (0, express_validator_1.check)("nombre").isLength({ min: 3 }).isLength({ max: 20 }).withMessage("El nombre del producto es obligatorio"),
    (0, express_validator_1.check)("descripcion").isLength({ min: 10 }).withMessage("La descripcion debe tener al menos 10 caracteres"),
    (0, express_validator_1.check)("precio")
        .isFloat({ min: 0 })
        .withMessage("El precio no puede ser negativo"),
    (0, express_validator_1.check)("imagenUrl").isURL().withMessage("la imagen es obligatoria y debe ser una URL"),
];
exports.mongoIdValidator = [
    (0, express_validator_1.check)("id").isMongoId().withMessage("El ID no es válido")
];
