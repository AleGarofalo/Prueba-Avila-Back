import { AppDataSource } from "../../../config/data-source";
import { Repository } from "typeorm";
import { User } from "../../../entities/user";
import { CreateUserDto } from "../DTO/createUserDTO";
import { FindUserCriteriaDto } from "../DTO/FindUserCriteriaDTO";
import bcrypt from "bcrypt";
import { AppError, errorHandler } from "../../../middlewares/error.middleware";

export class UserService {
  private userRepo: Repository<User>;

  constructor() {
    this.userRepo = AppDataSource.getRepository(User);
  }

  // Crear un nuevo usuario
  async createUser(dto: CreateUserDto): Promise<User> {
    const existing = await this.userRepo.findOneBy({ email: dto.email });
    if (existing) {
      throw new AppError("User with this email already exists.", 409);
    }

    if (dto.password != dto.confirmPassword) {
      throw new AppError("Passwords do not match.", 400);
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = this.userRepo.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
      role: dto.role,
    });

    return this.userRepo.save(user);
  }

  // Buscar usuario por id o email
  async findUser(criteria: FindUserCriteriaDto): Promise<User | null> {
    const user = await this.userRepo.findOneBy(criteria);
    if (!user) {
      throw new AppError("User with this email already exists.", 404);
    }
    return user;
  }

  // Obtener todos los usuarios
  async getAllUsers(): Promise<User[]> {
    return this.userRepo.find();
  }

  // Obtener las órdenes de un usuario
  async getUserOrders(userId: number) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ["orders", "orders.items", "orders.items.product"],
    });

    if (!user) {
      throw new AppError("User with this email already exists.", 404);
    }

    return user.orders;
  }
}
