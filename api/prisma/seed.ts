import { PrismaClient } from "@prisma/client";
import { assemblyPermissoes } from "../src/permissoes";
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
  await prisma.grupos.upsert({
    where: { id: 1 },
    update: {},
    create: {
      grupo: "Administrador",
      cor: "#00ff00",
    },
  });
  
  await prisma.usuario.upsert({
    where: { id: 1 },
    update: {},
    create: {
      nome: "Administrador",
      email: "admin@admin.com",
      senha: "admin",
      regra: "admin",
      anotacoes: "admin",
      grupoId: 1,
    },
  }); 
  await prisma.parcelas.upsert({
    where: { id: 1 },
    update: {},
    create: {
      periodo: "mensal",
      nome: "1 vez",
      quantidade: 1,
    },
  });

  const permissoes = assemblyPermissoes();

  for (const permissao of permissoes) {
    await prisma.permissoes.upsert({
      where: { slug: permissao.slug },
      update: {},
      create: {
        permissao: permissao.permissao,
        slug: permissao.slug,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
