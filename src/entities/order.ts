import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { OrderStatus } from "../types/orderStatus";
import { OrderItem, User } from ".";

@Entity({ name: "orders", schema: process.env.SQL_SCHEMA })
class Order {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => User, (user: User) => user.orders, { eager: true })
  user?: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    cascade: true,
  })
  items?: OrderItem[];

  @Column({
    type: "enum",
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status?: OrderStatus;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt?: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt?: Date;
}

export { Order };
