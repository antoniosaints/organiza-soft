-- DropForeignKey
ALTER TABLE `Assinatura` DROP FOREIGN KEY `Assinatura_clienteId_fkey`;

-- DropForeignKey
ALTER TABLE `AssinaturaBloqueio` DROP FOREIGN KEY `AssinaturaBloqueio_assinaturaId_fkey`;

-- DropForeignKey
ALTER TABLE `PatrimonioComprasFornecedores` DROP FOREIGN KEY `PatrimonioComprasFornecedores_produtoId_fkey`;

-- DropForeignKey
ALTER TABLE `PatrimonioProdutosMovimentos` DROP FOREIGN KEY `PatrimonioProdutosMovimentos_produtoId_fkey`;

-- AlterTable
ALTER TABLE `PatrimonioProdutoCategoria` ADD COLUMN `cor` VARCHAR(191) NOT NULL DEFAULT 'blue';

-- AddForeignKey
ALTER TABLE `Assinatura` ADD CONSTRAINT `Assinatura_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssinaturaBloqueio` ADD CONSTRAINT `AssinaturaBloqueio_assinaturaId_fkey` FOREIGN KEY (`assinaturaId`) REFERENCES `Assinatura`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PatrimonioProdutosMovimentos` ADD CONSTRAINT `PatrimonioProdutosMovimentos_produtoId_fkey` FOREIGN KEY (`produtoId`) REFERENCES `PatrimonioProdutos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PatrimonioComprasFornecedores` ADD CONSTRAINT `PatrimonioComprasFornecedores_produtoId_fkey` FOREIGN KEY (`produtoId`) REFERENCES `PatrimonioProdutos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
