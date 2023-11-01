"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "El email es obligatorio y único"],
        lowercase: true,
        trim: true,
    },
    contraseña: {
        type: String,
        required: [true, "La contraseña es obligatoria"],
        select: false,
    },
    rol: {
        type: String,
        lowercase: true,
        default: "usuario",
        enum: ["admin", "usuario"],
    },
}, {
    timestamps: { createdAt: true, updatedAt: true },
});
exports.default = (0, mongoose_1.model)("User", UserSchema);
