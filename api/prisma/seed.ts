import { PrismaClient } from "@prisma/client";
import { assemblyPermissoes } from "../src/permissoes";
const prisma = new PrismaClient();
async function main() {
  await prisma.usuario.upsert({
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
