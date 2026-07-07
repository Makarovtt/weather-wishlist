import { prisma } from "../src/lib/prisma.js";

async function seed() {}

seed()
  .catch((error) => {
    console.error(error);
    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
