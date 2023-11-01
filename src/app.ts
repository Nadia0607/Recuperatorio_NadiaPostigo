import express from "express";
import * as middlewares from "./config/middleware";
import * as database from "./config/database";
import * as routes from "./config/routes";
import errorHandler from "./middlewares/error.handler";

// inicialization
const app = express();

// settings
app.set("port", process.env.PORT || 3000);

// Connect to the database
database.configure();

// Middlewares globales
middlewares.configure(app);

// Routes
routes.register(app);

//Manejador de errores (next error), controladores
app.use(errorHandler);

export default app;
