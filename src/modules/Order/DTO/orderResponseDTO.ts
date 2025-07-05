import { Order } from "../../../entities/order";
import { OrderItem } from "../../../entities/orderItem";

export class OrderItemDto {
  productId: number;
  quantity: number;
  unitPrice: number;

  constructor(item: OrderItem) {
    this.productId = item.product.id;
    this.quantity = item.quantity;
    this.unitPrice = Number(item.priceAtPurchase);
  }
}

export class OrderResponseDto {
  id: number;
  userId: number;
  status: string;
  items: OrderItemDto[];

  constructor(order: Order) {
    this.id = order.id;
    this.userId = order.user.id;
    this.status = order.status;
    this.items = order.items?.map((item) => new OrderItemDto(item)) || [];
  }
}
