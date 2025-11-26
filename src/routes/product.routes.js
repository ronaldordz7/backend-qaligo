import { Router } from "express";
import { productController } from "../controllers/product.controller.js";

const router = Router();

router.get("/", productController.list);
router.get("/:id", productController.getOne);

export default router;
