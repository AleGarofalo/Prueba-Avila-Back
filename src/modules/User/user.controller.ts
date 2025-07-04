import { Request, Response, NextFunction } from "express";
import { UserService } from "./services/user.service";
import { CreateUserDto } from "./DTO/createUserDTO";
import { FindUserCriteriaDto } from "./DTO/FindUserCriteriaDTO";
import logger from "../../utils/logger";
import { AppError, errorHandler } from "../../middlewares/error.middleware";

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
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }

  // GET /api/users
  async getAllUsers(_req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  // GET /api/users/:id
  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const user = await this.userService.findUser({ id });
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  // GET /api/users/:id/orders
  async getUserOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.params.id);
      const orders = await this.userService.getUserOrders(userId);
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }
}
