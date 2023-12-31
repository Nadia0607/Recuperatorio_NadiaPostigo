import { Document } from "mongoose";

interface IUser extends Document {
  nombre: string;
  email: string;
  contraseña: string;
  rol: string;
  imagenUrl: String,
  validarContraseña(contraseña: string): Promise<boolean>;
  guardarContraseña(): Promise<boolean>;
}

export default IUser;
