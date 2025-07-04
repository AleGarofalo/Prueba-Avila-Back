import { Router } from "express";
import { ProductController } from "../product.controller";
import { authenticateToken } from "../../../middlewares/auth.middleware";
import { authorizeRole } from "../../../middlewares/role.middleware";
import { UserRole } from "../../../types/userRole";

const router = Router();
const controller = new ProductController();

// ✅ Obtener todos los productos (requiere token, no rol)
router.get("/", authenticateToken, (req, res, next) =>
  controller.getAll(req, res, next)
);

// ✅ Obtener un producto por ID
router.get("/:id", authenticateToken, (req, res, next) =>
  controller.getById(req, res, next)
);

// ✅ Crear un producto (admin)
router.post(
  "/",
  authenticateToken,
  authorizeRole(UserRole.ADMIN),
  (req, res, next) => controller.create(req, res, next)
);

// ✅ Cambiar estado (desactivar) un producto (admin)
router.patch(
  "/:id",
  authenticateToken,
  authorizeRole(UserRole.ADMIN),
  (req, res, next) => controller.update(req, res, next) // usa el mismo update
);

export default router;
