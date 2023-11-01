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
exports.register = void 0;
const user_route_1 = __importDefault(require("../routes/user.route"));
const auth_route_1 = __importDefault(require("../routes/auth.route"));
const product_route_1 = __importDefault(require("../routes/product.route"));
const register = (app) => __awaiter(void 0, void 0, void 0, function* () {
    app.use("/auth", auth_route_1.default);
    app.use("/users", user_route_1.default);
    app.use("/products", product_route_1.default);
    console.log("🟢 Routes registered");
});
exports.register = register;
