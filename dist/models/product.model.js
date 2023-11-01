"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
    },
    descripcion: {
        type: String,
    },
    precio: {
        type: mongoose_1.Schema.Types.Number,
        required: [true, "El precio es obligatorio"],
    },
    imagenUrl: {
        type: String,
    },
}, {
    timestamps: { createdAt: true, updatedAt: true },
});
exports.default = (0, mongoose_1.model)("Product", ProductSchema);
