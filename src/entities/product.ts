import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { OrderItem } from ".";
import { ProductStatus } from "../types/productStatus";

@Entity({ name: "products", schema: process.env.SQL_SCHEMA })
class Product {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  name: string = "";

  @Column("text")
  description: string = "";

  @Column("decimal", { scale: 2, precision: 10 })
  price: number = 0;

  @Column()
  stock: number = 0;

  @Column({
    type: "enum",
    enum: ProductStatus,
    default: ProductStatus.ACTIVE,
  })
  role: ProductStatus = ProductStatus.ACTIVE;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems?: OrderItem[];

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date = new Date(); // momento en que se crea el registro

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt!: Date; // ← sin valor por defecto
}

export { Product };
