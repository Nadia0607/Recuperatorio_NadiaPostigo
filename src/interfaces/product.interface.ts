import { Document } from "mongoose";

interface IProduct extends Document {
  nombre: string;
  descripcion: string;
  precio: number;
  imagenUrl: string;
 
}

export default IProduct;
