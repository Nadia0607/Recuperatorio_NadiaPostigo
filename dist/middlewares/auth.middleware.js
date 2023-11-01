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
exports.authMiddleware = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_exception_1 = require("../utils/http.exception");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.headers.authorization)
            throw new http_exception_1.UnauthorizedException("Missing authorization header.");
        let token = req.headers.authorization.split(" ")[1]; //extrae el token de la cabecera
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || ""); //verifica si el token es correcto y lo guarda en decoded sin hasheo
        if (!decoded)
            throw new http_exception_1.UnauthorizedException("Unauthorized.");
        const userFound = yield user_model_1.default.findById(decoded.sub); //busca al usuario en la base de datos usando el id(sub)del token.
        if (!userFound)
            throw new http_exception_1.UnauthorizedException("Unauthorized.");
        //req.user = userFound;
        next();
    }
    catch (error) {
        return next(error);
    }
});
exports.authMiddleware = authMiddleware;
