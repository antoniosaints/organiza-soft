import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  await prisma.contasSistema.upsert({
    where: { id: 1 },
    update: {},
    create: {
      conta: "Conta geral do sistema",
      email: "admin@organizasoft.com.br",
      plano: "admin",
      stripeCustomerId: "",
    },
  })

  await prisma.usuario.upsert({
    where: { id: 1 },
    update: {},
    create: {
      contaSistemaId: 1,
      nome: "Administrador",
      email: "admin@admin.com",
      senha: "admin",
      regra: "proprietario",
      anotacoes: "admin"
    },
  }); 
  await prisma.financeiroParcelas.upsert({
    where: { id: 1 },
    update: {},
    create: {
      contaSistemaId: 1,
      periodo: "mensal",
      nome: "1 vez",
      quantidade: 1,
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
