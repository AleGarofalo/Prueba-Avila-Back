import { Request, Response, NextFunction } from "express";
import { OrderService } from "./services/order.service";
import { CreateOrderDto } from "./DTO/createOrderDTO";
import { OrderResponseDto } from "./DTO/orderResponseDTO";
import logger from "../../utils/logger";
import { AppError } from "../../middlewares/error.middleware";

export class OrderController {
  private orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  // Crear una orden
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto: CreateOrderDto = req.body;
      const order = await this.orderService.createOrder(dto);
      logger.info(`Order created with ID: ${order.id}`);
      res.status(201).json(new OrderResponseDto(order));
    } catch (err) {
      next(err);
    }
  }

  // Obtener todas las órdenes (solo admin)
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const orders = await this.orderService.getAllOrders();
      const result = orders.map((order) => new OrderResponseDto(order));
      logger.info(`Retrieved ${orders.length} orders`);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  // Obtener una orden por ID
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const order = await this.orderService.getOrderById(id);

      if (!order) {
        throw new AppError("Order not found", 404);
      }

      logger.info(`Order retrieved: ID ${id}`);
      res.json(new OrderResponseDto(order));
    } catch (err) {
      next(err);
    }
  }
}
