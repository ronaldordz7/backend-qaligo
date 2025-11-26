import { prisma } from "../config/db.js";

export const orderService = {
  async createOrder(userId, payload) {
    const { items, customerName, customerPhone, customerAddress } = payload;

    if (!items || !items.length) {
      throw new Error("El carrito está vacío");
    }

    // recalcular total desde la BD
    let total = 0;
    const orderItemsData = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId }
      });
      if (!product) continue;

      const unitPrice = product.basePrice + (item.extraPrice || 0);
      const quantity = item.quantity || 1;
      total += unitPrice * quantity;

      orderItemsData.push({
        productId: product.id,
        quantity,
        unitPrice,
        customizationJson: item.customizationJson || null
      });
    }

    const order = await prisma.order.create({
      data: {
        userId,
        status: "PAID", // en el MVP asumimos éxito
        totalAmount: total,
        customerName,
        customerPhone,
        customerAddress,
        items: { create: orderItemsData }
      },
      include: { items: true }
    });

    return order;
  },

  async getMyOrders(userId) {
    return prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: { items: true }
    });
  },

  async getAllOrders() {
    return prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { id: true, name: true, email: true } },
        items: true
      }
    });
  }
};
