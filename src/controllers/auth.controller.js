import { authService } from "../services/auth.service.js";

export const authController = {
  async register(req, res) {
    try {
      const data = await authService.register(req.body);
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err.message });
    }
  },

  async login(req, res) {
    try {
      const data = await authService.login(req.body);
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err.message });
    }
  },

  async me(req, res) {
    try {
      const user = await authService.me(req.user.id);
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error interno" });
    }
  }
};
