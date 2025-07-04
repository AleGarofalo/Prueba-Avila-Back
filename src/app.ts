import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/error.middleware";

dotenv.config();

const app = express();

// Middlewares globales
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Rutas base (se irán montando aquí)
app.get("/", (req, res) => {
  res.send("📦 AvilaTek API is running.");
});

// Aquí podrías montar tus rutas, por ejemplo:
// app.use("/api/users", userRoutes);

app.use(errorHandler);

export default app;
