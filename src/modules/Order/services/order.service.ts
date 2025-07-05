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
  // Crear una orden con múltiples items
  async createOrder(dto: CreateOrderDto): Promise<Order> {
    const user = await this.userRepo.findOneBy({ id: dto.userId });
    if (!user) {
      throw new AppError("User not found", 404);
    }

    if (!dto.items || dto.items.length === 0) {
      throw new AppError("Order must include at least one product", 400);
    }

    // Crear orden sin items aún
    const order = this.orderRepo.create({
      user,
      status: OrderStatus.PENDING,
    });

    // Guardar primero la orden para que tenga ID
    await this.orderRepo.save(order);

    const orderItems: OrderItem[] = [];

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

      // Descontar stock y guardar producto
      product.stock -= item.quantity;
      await this.productRepo.save(product);

      // Crear OrderItem con referencia a la orden ya creada
      const orderItem = this.orderItemRepo.create({
        product,
        quantity: item.quantity,
        priceAtPurchase: product.price,
        order, // ya tiene ID
      });

      orderItems.push(orderItem);
    }

    // Guardar todos los items
    await this.orderItemRepo.save(orderItems);

    // Asociar los items a la orden y devolver orden con relaciones
    order.items = orderItems;
    return this.orderRepo.save(order); // Devuelve con los items listos
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
