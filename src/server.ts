import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

interface User {
  id: string;
  name: string;
  description: string;
  age: number;
  hasHumps: boolean;
}

async function createUser(user: User) {
  const createdUser = await prisma.user.create({
    data: {
      ...user,
      id: uuidv4(), // Gerar um novo UUID
    },
  });
  console.log("User created:", createdUser);
}

// Resto do código...

async function main() {
  try {
    await prisma.$connect();

    // Exemplo de criação de um usuário
    const newUser: User = {
      id: "", // O ID será gerado pelo código
      name: "John Doe",
      description: "Lorem ipsum",
      age: 25,
      hasHumps: false,
    };
    await createUser(newUser);

    // Resto do código...
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
