import { Router } from "express";
import { adminController } from "../controllers/admin.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { requireAdmin } from "../middlewares/role.middleware.js";

const router = Router();

router.get("/orders", requireAuth, requireAdmin, adminController.getAllOrders);

export default router;
