import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const defaultUser = await prisma.usuario.upsert({
    where: { id: 1 },
    update: {},
    create: {
      nome: "Administrador",
      email: "admin",
      senha: "admin",
      regra: "admin",
      anotacoes: "admin",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
