import { Application } from "express";
import userRoutes from "../routes/user.route";
import authRoutes from "../routes/auth.route";
import productRoutes from "../routes/product.route";



export const register = async (app: Application) => {
 app.use("/auth",authRoutes);
 app.use("/users",userRoutes);
 app.use("/products",productRoutes);
 console.log("🟢 Routes registered");
};

