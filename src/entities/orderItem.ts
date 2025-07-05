import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Product, Order } from ".";

@Entity({ name: "order_items", schema: process.env.SQL_SCHEMA })
class OrderItem {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => Order, (order) => order.items, { onDelete: "CASCADE" })
  @JoinColumn({ name: "order_id" })
  order?: Order;

  @ManyToOne(() => Product, { eager: true })
  @JoinColumn({ name: "product_id" })
  product: Product = new Product();

  @Column()
  quantity: number = 0;

  @Column("decimal", { name: "price_at_purchase", scale: 2, precision: 10 })
  priceAtPurchase?: number;
}

export { OrderItem };
