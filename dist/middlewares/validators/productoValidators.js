"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoIdValidator = exports.productoValidators = void 0;
const express_validator_1 = require("express-validator");
exports.productoValidators = [
    (0, express_validator_1.check)("nombre").isLength({ min: 3 }).isLength({ max: 20 }).withMessage("El nombre es obligatorio"),
    (0, express_validator_1.check)("descripcion").isLength({ min: 10 }).withMessage("El debe tener minimo 10 caracteres"),
    (0, express_validator_1.check)("precio")
        .isFloat({ min: 0 })
        .withMessage("El precio no puede ser negativo"),
    (0, express_validator_1.check)("imagenUrl").isURL().withMessage("la imagen es obligatorio y debe ser una URL"),
];
exports.mongoIdValidator = [
    (0, express_validator_1.check)("id").isMongoId().withMessage("El ID proporcionado no es válido para MongoDB.")
];
