import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "./error.middleware";
import { JwtPayloadType } from "../types/jwtPayload";

export interface AuthRequest extends Request {
  user?: JwtPayloadType;
}

export function authenticateToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError("Access token missing or malformed", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayloadType; // 👈 conversión explícita al tipo definido

    req.user = decoded;
    next();
  } catch (err) {
    throw new AppError("Invalid or expired token", 403);
  }
}
