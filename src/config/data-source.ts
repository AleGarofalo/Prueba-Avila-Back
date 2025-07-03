import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

// Cargar variables de entorno
dotenv.config();

// Importar entidades
import { User } from "../entities/user";
import { Product } from "../entities/product";
import { Order } from "../entities/order";
import { OrderItem } from "../entities/orderItem";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.SQL_HOST,
  port: Number(process.env.SQL_PORT) || 5432,
  username: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DB,
  schema: process.env.SQL_SCHEMA,
  synchronize: true, // Solo en desarrollo, en producción usa migraciones
  logging: false,
  entities: [User, Product, Order, OrderItem],
});
