/*
  Warnings:

  - Added the required column `contaSistemaId` to the `PatrimonioArmazenamentos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contaSistemaId` to the `PatrimonioComprasFornecedores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contaSistemaId` to the `PatrimonioFornecedores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contaSistemaId` to the `PatrimonioProdutoCategoria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contaSistemaId` to the `PatrimonioProdutos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contaSistemaId` to the `PatrimonioProdutosEstoques` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contaSistemaId` to the `PatrimonioProdutosMovimentos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `PatrimonioArmazenamentos` ADD COLUMN `contaSistemaId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `PatrimonioComprasFornecedores` ADD COLUMN `contaSistemaId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `PatrimonioFornecedores` ADD COLUMN `contaSistemaId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `PatrimonioProdutoCategoria` ADD COLUMN `contaSistemaId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `PatrimonioProdutos` ADD COLUMN `contaSistemaId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `PatrimonioProdutosEstoques` ADD COLUMN `contaSistemaId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `PatrimonioProdutosMovimentos` ADD COLUMN `contaSistemaId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `PatrimonioProdutos` ADD CONSTRAINT `PatrimonioProdutos_contaSistemaId_fkey` FOREIGN KEY (`contaSistemaId`) REFERENCES `ContasSistema`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PatrimonioProdutoCategoria` ADD CONSTRAINT `PatrimonioProdutoCategoria_contaSistemaId_fkey` FOREIGN KEY (`contaSistemaId`) REFERENCES `ContasSistema`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PatrimonioArmazenamentos` ADD CONSTRAINT `PatrimonioArmazenamentos_contaSistemaId_fkey` FOREIGN KEY (`contaSistemaId`) REFERENCES `ContasSistema`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PatrimonioProdutosEstoques` ADD CONSTRAINT `PatrimonioProdutosEstoques_contaSistemaId_fkey` FOREIGN KEY (`contaSistemaId`) REFERENCES `ContasSistema`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PatrimonioProdutosMovimentos` ADD CONSTRAINT `PatrimonioProdutosMovimentos_contaSistemaId_fkey` FOREIGN KEY (`contaSistemaId`) REFERENCES `ContasSistema`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PatrimonioFornecedores` ADD CONSTRAINT `PatrimonioFornecedores_contaSistemaId_fkey` FOREIGN KEY (`contaSistemaId`) REFERENCES `ContasSistema`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PatrimonioComprasFornecedores` ADD CONSTRAINT `PatrimonioComprasFornecedores_contaSistemaId_fkey` FOREIGN KEY (`contaSistemaId`) REFERENCES `ContasSistema`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
