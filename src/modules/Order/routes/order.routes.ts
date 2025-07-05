import { Router } from "express";
import { OrderController } from "../order.controller";
import { authenticateToken } from "../../../middlewares/auth.middleware";
import { authorizeRole } from "../../../middlewares/role.middleware";
import { UserRole } from "../../../types/userRole";

const router = Router();
const controller = new OrderController();

// ✅ Crear orden (usuario autenticado)
router.post("/", authenticateToken, (req, res, next) =>
  controller.create(req, res, next)
);

// ✅ Ver todas las órdenes (solo admin)
router.get(
  "/",
  authenticateToken,
  authorizeRole(UserRole.ADMIN),
  (req, res, next) => controller.getAll(req, res, next)
);

// ✅ Ver una orden por ID (usuario autenticado)
router.get("/:id", authenticateToken, (req, res, next) =>
  controller.getById(req, res, next)
);

export default router;
