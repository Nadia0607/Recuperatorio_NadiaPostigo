"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
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
    imagenUrl: {
        type: String,
    }
}, {
    timestamps: { createdAt: true, updatedAt: true },
});
UserSchema.methods.guardarContraseña =
    function guardarContraseña() {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this; // igualo usuario con this usuario
            const salt = yield bcrypt_1.default.genSalt(10); // generamos 10 saltos (algoritmo)
            user.contraseña = yield bcrypt_1.default.hash(user.contraseña, salt); //hashea la contraseña
            return true;
        });
    };
UserSchema.methods.validarContraseña = function validarContraseña(contraseña) {
    return bcrypt_1.default.compare(contraseña, this.contraseña); //comparo contraseña que recibo con la contraseña guardada en la bd.
};
exports.default = (0, mongoose_1.model)("User", UserSchema);
