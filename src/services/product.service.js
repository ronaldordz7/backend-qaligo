import { prisma } from "../config/db.js";

export const productService = {
  async listAll() {
    return prisma.product.findMany({
      where: { isActive: true },
      include: { options: true }
    });
  },

  async getById(id) {
    return prisma.product.findUnique({
      where: { id: Number(id) },
      include: { options: true }
    });
  }
};
