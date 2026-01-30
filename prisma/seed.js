import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  const password = await bcrypt.hash("123456", 10);

  const user = await prisma.user.upsert({
    where: { email: "test@test.com" },
    update: {},
    create: {
      name: "Test User",
      email: "test@test.com",
      password,
    },
  });


  const mobileCategory = await prisma.category.upsert({
    where: { name: "Mobile" },
    update: {},
    create: { name: "Mobile" },
  });

  const laptopCategory = await prisma.category.upsert({
    where: { name: "Laptop" },
    update: {},
    create: { name: "Laptop" },
  });

 
  await prisma.product.createMany({
    data: [
      {
        title: "iPhone 15",
        description: "Apple iPhone 15 smartphone",
        price: 79999,
        image: "https://via.placeholder.com/150",
        categoryId: mobileCategory.id,
      },
      {
        title: "Samsung S24",
        description: "Samsung flagship phone",
        price: 69999,
        image: "https://via.placeholder.com/150",
        categoryId: mobileCategory.id,
      },
      {
        title: "MacBook Air",
        description: "Apple M2 laptop",
        price: 119999,
        image: "https://via.placeholder.com/150",
        categoryId: laptopCategory.id,
      },
    ],
    skipDuplicates: true,
  });

  console.log(" Users, categories & products seeded successfully");
}

main()
  .catch((e) => {
    console.error(" Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
