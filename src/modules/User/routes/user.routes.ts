import { Router } from "express";
import { UserController } from "../user.controller";
import { authenticateToken } from "../../../middlewares/auth.middleware";
import { authorizeRole } from "../../../middlewares/role.middleware";
import { UserRole } from "../../../types/userRole";

const router = Router();
const userController = new UserController();

// ✅ Registro libre para cualquier usuario (no requiere autenticación ni rol)
router.post("/register", (req, res, next) =>
  userController.registerUser(req, res, next)
);

// ✅ Solo ADMIN puede ver todos los usuarios
router.get(
  "/",
  authenticateToken,
  authorizeRole(UserRole.ADMIN),
  (req, res, next) => userController.getAllUsers(req, res, next)
);

// ✅ Solo ADMIN puede ver cualquier usuario por ID
router.get(
  "/:id",
  authenticateToken,
  authorizeRole(UserRole.ADMIN),
  (req, res, next) => userController.getUserById(req, res, next)
);

// ✅ Cualquier usuario autenticado puede ver sus órdenes
router.get("/:id/orders", authenticateToken, (req, res, next) =>
  userController.getUserOrders(req, res, next)
);

export default router;
