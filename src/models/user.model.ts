import { model, Schema } from "mongoose";
import IUser from "../interfaces/user.interface";
import bcrypt from "bcrypt";

const UserSchema = new Schema<IUser>(
  {
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
    imagenUrl:{
      type: String,
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);

UserSchema.methods.guardarContraseña =
  async function guardarContraseña(): Promise<boolean> {
    const user = this as any; // igualo usuario con this usuario
    const salt = await bcrypt.genSalt(10); // generamos 10 saltos (algoritmo)
    user.contraseña = await bcrypt.hash(user.contraseña, salt); //hashea la contraseña
    return true;
  };

UserSchema.methods.validarContraseña = function validarContraseña( contraseña: string): Promise<boolean>
{
  return bcrypt.compare(contraseña, (this as any).contraseña); //comparo contraseña que recibo con la contraseña guardada en la bd.
};

export default model<IUser>("User", UserSchema);