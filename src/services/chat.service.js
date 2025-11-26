import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "../config/db.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const chatService = {
  async processMessage(message) {
    try {
      // traer menú para que recomiende SOLO platos reales
      const products = await prisma.product.findMany({
        where: { isActive: true },
        select: { name: true, description: true, basePrice: true, category: true }
      });

      const menuText = products
        .map(
          p =>
            `- ${p.name} (S/ ${p.basePrice.toFixed(
              2
            )}): ${p.description} [${p.category}]`
        )
        .join("\n");

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `
Eres un asistente amable experto en comida rápida saludable de la marca Q'aliGo.
Solo puedes recomendar platos de este menú:

${menuText}

El usuario dice: "${message}"

Responde en español, en un párrafo corto (máximo 3 oraciones), siendo claro y amigable.
Si el usuario pide algo fuera del menú, sugiere la opción más cercana.
`;

      const result = await model.generateContent(prompt);
      const reply = result.response.text();

      return reply;
    } catch (error) {
      console.error("Error en chat Gemini:", error);
      return "No puedo responder ahora mismo, por favor intenta nuevamente.";
    }
  }
};
