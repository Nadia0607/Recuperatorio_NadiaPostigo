import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import IUser from "../interfaces/user.interface";
import {
    BadRequestException,
    HttpException,
    NotFoundException,
    UnauthorizedException,
  } from "../utils/http.exception";

export const index = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
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
        const { nombre, email, contraseña, rol, imagenUrl } = req.body;

        if (await User.findOne({ email })) {
          throw new BadRequestException("The user is already registered");
        }
    
        let user: IUser = new User({
          nombre,
          email,
          contraseña,
          rol,
          imagenUrl,
        });
    
        if ((await user.guardarContraseña()) === false) {
          throw new BadRequestException("Password encryption failed");
        }
    
        await user.save();

        return res.status(200).json(user);
    } catch (error) {
        return next(error);
    }
};
//show

export const show = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        return res.status(200).json(user);
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
        const user = await User.findById(id);
        if (!user) return res.status(404).json("No existe");
        await user.deleteOne();
        return res.status(200).json(user);
    } catch (error) {
        return next(error);
    }
};
