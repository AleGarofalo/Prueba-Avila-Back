import { AppDataSource } from "../../../config/data-source";
import { User } from "../../../entities/user";
import { loginDto } from "../DTO/loginDTO";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../../../middlewares/error.middleware";

export class AuthService {
  async login(dto: loginDto): Promise<string> {
    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOneBy({ email: dto.email });

    if (!user) {
      throw new AppError("Invalid credentials", 401);
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new AppError("Invalid credentials", 401);
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const expiration = String(process.env.JWT_EXPIRES_IN);
    const secret: string = process.env.JWT_SECRET || "laclavedeltoken123";
    const expiresIn = "1h";

    if (!secret) {
      throw new AppError("JWT secret not configured", 500);
    }

    const token = jwt.sign(payload, secret, { expiresIn });

    return token;
  }
}
