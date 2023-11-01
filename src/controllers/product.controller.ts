import { Request, Response, NextFunction } from "express";
import MProduct from "../models/product.model";
import IProduct from "../interfaces/product.interface";

export const index = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const products = await MProduct.find();
        return res.status(200).json(products);
    } catch (error) {
        return next(error);
    }
};

export const create = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { nombre, descripcion, precio, imagenUrl } = req.body;

        const product: IProduct = new MProduct({
            nombre,
            descripcion,
            precio,
            imagenUrl,
        });

        await product.save();

        return res.status(200).json(product);
    } catch (error) {
        return next(error);
    }
};
//show

export const show = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const product = await MProduct.findById(id);
        return res.status(200).json(product);
    } catch (error) {
        return next(error);
    }
};
//destroy o delate

export const destroy = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const product = await MProduct.findById(id);
        if (!product) return res.status(404).json("Not existe");
        await product.deleteOne();
        return res.status(200).json(product);
    } catch (error) {
        return next(error);
    }
};
