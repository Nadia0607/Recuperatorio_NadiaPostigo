import { Request, Response, NextFunction } from "express";
import MUser from "../models/user.model";
import IUser from "../interfaces/user.interface";
import jwt from "jsonwebtoken";
import {
  BadRequestException,
  HttpException,
  NotFoundException,
  UnauthorizedException,
} from "../utils/http.exception";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { nombre, email, contraseña, rol,imagenUrl } = req.body;

    if (await MUser.findOne({ email })) {
      throw new BadRequestException("The user is already registered");
    }

    let user: IUser = new MUser({
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

    // Devolver datos
    const userData = await MUser.findById(user._id).orFail(
      new NotFoundException("User Data not found")
    );
    return res.json(userData);
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: IUser = await MUser.findOne({ email: req.body.email })
      .select("+contraseña")
      .orFail(new NotFoundException("User not found"));

    if (!user.contraseña)
      throw new HttpException(401, "Unauthorized, missing password");

    const correctPassword = await user.validarContraseña(req.body.contraseña);
    if (!correctPassword) throw new UnauthorizedException("Invalid Password");

    // Create a Token/carga util=id/secret/ duracion
    const token: string = jwt.sign({ sub: user._id },process.env.JWT_SECRET || "",{expiresIn: process.env.JWT_EXPIRATION});

    const { contraseña, ...data } = user.toJSON(); // separa contraseña del resto de datos de usuarios(los extrae)
    return res.header("auth-token", token).json({ ...data, token }); //mando en la cabecera el token y en el json el usuario(sin password) y el token
  } catch (error) {
    next(error);
  }
};
