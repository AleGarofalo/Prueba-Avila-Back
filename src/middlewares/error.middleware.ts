// src/middlewares/error.middleware.ts

import { Request, Response, NextFunction } from "express";

// Clase base para errores personalizados
class AppError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Error de validación (400)
class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

// Error de base de datos (500)
class DatabaseError extends AppError {
  constructor(message: string) {
    super(message, 500);
  }
}

// Middleware central de manejo de errores
function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("❌", err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  res.status(statusCode).json({
    error: true,
    message,
  });
}

export { errorHandler, AppError, ValidationError, DatabaseError };
