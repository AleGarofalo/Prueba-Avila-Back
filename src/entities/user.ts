import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { UserRole } from "../types/userRole";
import { Order } from "./order";

@Entity({ name: "users", schema: process.env.SQL_SCHEMA })
class User {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ unique: false })
  name: string = "";

  @Column({ unique: true })
  email: string = "";

  @Column()
  password: string = "";

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole = UserRole.USER;

  @OneToMany(() => Order, (order) => order.user)
  orders?: Order[];

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date = new Date(); // momento en que se crea el registro

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt!: Date; // ← sin valor por defecto
}

export { User };
