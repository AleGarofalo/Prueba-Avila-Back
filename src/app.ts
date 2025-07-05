import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/error.middleware";
import userRoutes from "./modules/User/routes/user.routes";
import authRoutes from "./modules/auth/routes/auth.routes";
import productRoutes from "./modules/Product/routes/product.routes";
import orderRoutes from "./modules/Order/routes/order.routes";

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

//LISTADO DE PREFIJOS DE RUTAS
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.use(errorHandler);

export default app;
