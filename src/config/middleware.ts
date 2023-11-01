import cors from "cors";
import express, { Application } from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import logger from "../utils/logger";


export const configure = async (app: Application) => {
  dotenv.config(); //lee archivo.env
  app.use(
    morgan("dev", {  //muestra llamadas a la api
      stream: {
        write: (message: string) => {
          logger.info(message.trim());
        },
      },
    })
  );
  app.use(cors()); //evita error de cors
  app.use(express.urlencoded({ extended: false })); //permite leer la url
  app.use(express.json()); //permite leer json

  console.log("🟢 Middlewares configurated");
};
