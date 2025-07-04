import { OrderItemDto } from "./orderItemDTO";

export class CreateOrderDto {
  userId: number = 0;
  items: OrderItemDto[] = [];
}
