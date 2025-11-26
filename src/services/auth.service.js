import bcrypt from "bcryptjs";
import { prisma } from "../config/db.js";
import { signToken } from "../utils/jwt.js";

export const authService = {
  async register({ name, email, password }) {
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) throw new Error("El correo ya está registrado");

    const hash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hash,
        role: "CUSTOMER"
      }
    });

    const token = signToken({ id: user.id, email: user.email, role: user.role });

    return {
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    };
  },

  async login({ email, password }) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("Credenciales inválidas");

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) throw new Error("Credenciales inválidas");

    const token = signToken({ id: user.id, email: user.email, role: user.role });

    return {
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    };
  },

  async me(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, role: true, createdAt: true }
    });
    return user;
  }
};
