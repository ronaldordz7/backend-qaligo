import { adminService } from "../services/admin.service.js";

export const adminController = {
  async getAllOrders(req, res) {
    try {
      const orders = await adminService.getDashboard();
      res.json(orders);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error interno" });
    }
  }
};
