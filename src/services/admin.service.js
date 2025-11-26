import { orderService } from "./order.service.js";

export const adminService = {
  async getDashboard() {
    const orders = await orderService.getAllOrders();
    return orders;
  }
};
