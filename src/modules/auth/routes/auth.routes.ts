import { Router } from "express";
import { AuthController } from "../auth.controller";

const router = Router();
const authController = new AuthController();

// POST /api/auth/login
router.post("/login", (req, res, next) => authController.login(req, res, next));

export default router;
