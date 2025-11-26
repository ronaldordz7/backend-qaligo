import { chatService } from "../services/chat.service.js";

export const chatController = {
  async handleMessage(req, res) {
    try {
      const { message } = req.body;
      if (!message) return res.status(400).json({ error: "Mensaje vacío" });

      const reply = await chatService.processMessage(message);
      res.json({ reply });
    } catch (err) {
      console.error(err);
      res.status(500).json({ reply: "Hubo un problema procesando tu mensaje." });
    }
  }
};
