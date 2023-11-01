import { model, Schema } from "mongoose";
import IProduct from "../interfaces/product.interface";


const ProductSchema = new Schema<IProduct>(
  
  {

    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
    },
    descripcion: {
      type: String,
    },
    precio: {
      type: Schema.Types.Number,
      required: [true, "El precio es obligatorio"],
    },
    imagenUrl: {
      type: String,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);


export default model<IProduct>("Product", ProductSchema);