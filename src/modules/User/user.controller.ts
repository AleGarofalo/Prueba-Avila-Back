import { Request, Response, NextFunction } from "express";
import { UserService } from "./services/user.service";
import { CreateUserDto } from "./DTO/createUserDTO";
import { FindUserCriteriaDto } from "./DTO/FindUserCriteriaDTO";
import { UserResponseDto } from "./DTO/userResponseDTO";
import logger from "../../utils/logger";
import { AppError } from "../../middlewares/error.middleware";
import { OrderResponseDto } from "../Order/DTO/orderResponseDTO";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  // POST /api/users/register
  async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const dto: CreateUserDto = req.body;
      const newUser = await this.userService.createUser(dto);
      logger.info(`🆕 User registered: ${newUser.email}`);
      res.status(201).json(new UserResponseDto(newUser));
    } catch (error) {
      next(error);
    }
  }

  // GET /api/users
  async getAllUsers(_req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userService.getAllUsers();
      const result = users.map((user) => new UserResponseDto(user));
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  // GET /api/users/:id
  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const user = await this.userService.findUser({ id });
      if (user) res.json(new UserResponseDto(user));
    } catch (error) {
      next(error);
    }
  }

  // GET /api/users/:id/orders

  async getUserOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.params.id);
      const orders = await this.userService.getUserOrders(userId);
      let result: OrderResponseDto[] = [];
      if (orders) {
        result = orders.map((order) => new OrderResponseDto(order));
      }
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}
