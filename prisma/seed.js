import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Admin
  const adminEmail = "admin@qaligo.com";
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: "Admin",
      email: adminEmail,
      passwordHash: "$2a$10$uMZ4xwSuxU7Y1m6y6Z9/5ePgcOEN5e6xFhfYlUwSPzQGxyLzWQem.", // "admin123"
      role: "ADMIN"
    }
  });

  console.log("Admin creado:", admin.email);

  // Productos demo
  const bowl = await prisma.product.create({
    data: {
      name: "Bowl Quinoa Power",
      description: "Quinoa, mix de hojas verdes, pollo a la plancha y vegetales frescos.",
      basePrice: 22.5,
      imageUrl: "https://via.placeholder.com/400x250.png?text=Bowl+Quinoa",
      category: "Bowl",
      customizable: true,
      options: {
        create: [
          { type: "BASE", label: "Quinoa", priceDelta: 0 },
          { type: "BASE", label: "Arroz integral", priceDelta: 0 },
          { type: "PROTEIN", label: "Pollo a la plancha", priceDelta: 3 },
          { type: "PROTEIN", label: "Tofu grill", priceDelta: 2.5 },
          { type: "EXTRA", label: "Palta", priceDelta: 2 },
          { type: "EXTRA", label: "Hummus", priceDelta: 2 }
        ]
      }
    }
  });

  const salad = await prisma.product.create({
    data: {
      name: "Ensalada Fresh Green",
      description: "Mix de hojas, pepino, tomate cherry, garbanzos y vinagreta ligera.",
      basePrice: 18.9,
      imageUrl: "https://via.placeholder.com/400x250.png?text=Ensalada",
      category: "Ensalada",
      customizable: true
    }
  });

  console.log("Productos creados:", bowl.name, salad.name);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
