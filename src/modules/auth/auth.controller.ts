import { Request, Response, NextFunction } from "express";
import { AuthService } from "./services/auth.service";
import logger from "../../utils/logger";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  // POST /api/auth/login
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const token = await this.authService.login(req.body);
      logger.info(`🔐 Login successful for ${req.body.email}`);
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }
}
