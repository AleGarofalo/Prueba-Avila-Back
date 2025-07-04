import { AppDataSource } from "../../../config/data-source";
import { Repository } from "typeorm";
import { Order } from "../../../entities/order";
import { OrderItem } from "../../../entities/orderItem";
import { Product } from "../../../entities/product";
import { User } from "../../../entities/user";
import { CreateOrderDto } from "../DTO/createOrderDTO";
import { AppError } from "../../../middlewares/error.middleware";
import { OrderStatus } from "../../../types/orderStatus";

export class OrderService {
  private orderRepo: Repository<Order>;
  private orderItemRepo: Repository<OrderItem>;
  private userRepo: Repository<User>;
  private productRepo: Repository<Product>;

  constructor() {
    this.orderRepo = AppDataSource.getRepository(Order);
    this.orderItemRepo = AppDataSource.getRepository(OrderItem);
    this.userRepo = AppDataSource.getRepository(User);
    this.productRepo = AppDataSource.getRepository(Product);
  }

  // Crear una orden con múltiples items
  async createOrder(dto: CreateOrderDto): Promise<Order> {
    const user = await this.userRepo.findOneBy({ id: dto.userId });
    if (!user) {
      throw new AppError("User not found", 404);
    }

    if (!dto.items || dto.items.length === 0) {
      throw new AppError("Order must include at least one product", 400);
    }

    const order = this.orderRepo.create({
      user,
      status: OrderStatus.PENDING,
      items: [],
    });

    for (const item of dto.items) {
      const product = await this.productRepo.findOneBy({ id: item.productId });

      if (!product) {
        throw new AppError(`Product with ID ${item.productId} not found`, 404);
      }

      if (product.stock < item.quantity) {
        throw new AppError(
          `Insufficient stock for product ${product.name}`,
          400
        );
      }

      // Descontar stock
      product.stock -= item.quantity;
      await this.productRepo.save(product);

      // Crear el OrderItem
      const orderItem = this.orderItemRepo.create({
        product,
        quantity: item.quantity,
        priceAtPurchase: product.price,
        order, // Relación inversa
      });

      if (!order.items) {
        order.items = [];
      }
      order.items.push(orderItem);
    }

    return this.orderRepo.save(order);
  }

  // Obtener todas las órdenes (solo para admin)
  async getAllOrders(): Promise<Order[]> {
    return this.orderRepo.find({
      relations: ["user", "items", "items.product"],
      order: { createdAt: "DESC" },
    });
  }

  // Obtener una orden por ID
  async getOrderById(id: number): Promise<Order | null> {
    return this.orderRepo.findOne({
      where: { id },
      relations: ["user", "items", "items.product"],
    });
  }
}
