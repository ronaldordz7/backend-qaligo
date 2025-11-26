import { orderService } from "../services/order.service.js";

export const orderController = {
  async create(req, res) {
    try {
      const order = await orderService.createOrder(req.user.id, req.body);
      res.json(order);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err.message });
    }
  },

  async myOrders(req, res) {
    try {
      const orders = await orderService.getMyOrders(req.user.id);
      res.json(orders);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error interno" });
    }
  }
};
