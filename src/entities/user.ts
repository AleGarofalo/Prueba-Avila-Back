import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { UserRole } from "../types/userRole";
import { Order } from ".";

@Entity({ name: "users", schema: process.env.SQL_SCHEMA }) // Evita conflicto con palabra reservada
class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: false })
  name?: string;

  @Column({ unique: true })
  email?: string;

  @Column()
  password?: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER,
  })
  role?: UserRole;

  @OneToMany(() => Order, (order) => order.user)
  orders?: Order[];

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt?: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt?: Date;
}

export { User };
