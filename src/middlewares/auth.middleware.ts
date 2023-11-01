import User from "../models/user.model";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { HttpException, UnauthorizedException } from "../utils/http.exception";


export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers.authorization)
      throw new UnauthorizedException("Missing authorization header.");

    let token = req.headers.authorization.split(" ")[1]; //extrae el token de la cabecera

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as any; //verifica si el token es correcto y lo guarda en decoded sin hasheo
    if (!decoded) throw new UnauthorizedException("Unauthorized.");

    const userFound = await User.findById(decoded.sub); //busca al usuario en la base de datos usando el id(sub)del token.
    if (!userFound) throw new UnauthorizedException("Unauthorized.");

    //req.user = userFound;
    next();
  } catch (error) {
    return next(error);
  }
};
