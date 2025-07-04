import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";
import { AppError } from "./error.middleware";
import { UserRole } from "../types/userRole";

export function authorizeRole(...allowedRoles: UserRole[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    let userRole: UserRole | null = null;

    switch (req.user?.role) {
      case UserRole.ADMIN:
        userRole = UserRole.ADMIN;
        break;

      case UserRole.USER:
        userRole = UserRole.USER;
        break;

      default:
        userRole = null;
        break;
    }

    if (!userRole) {
      throw new AppError("User role not found or invalid", 403);
    }

    if (!allowedRoles.includes(userRole)) {
      throw new AppError("Forbidden: insufficient permissions", 403);
    }

    next();
  };
}
