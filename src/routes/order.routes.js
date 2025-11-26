import { Router } from "express";
import { orderController } from "../controllers/order.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", requireAuth, orderController.create);
router.get("/my", requireAuth, orderController.myOrders);

export default router;
