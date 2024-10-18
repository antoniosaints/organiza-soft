/*
  Warnings:

  - A unique constraint covering the columns `[produtoId]` on the table `PatrimonioProdutos` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `quantidade` to the `PatrimonioComprasFornecedores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `produtoId` to the `PatrimonioProdutos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valorUnitario` to the `PatrimonioProdutosMovimentos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `PatrimonioComprasFornecedores` ADD COLUMN `quantidade` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `PatrimonioFornecedores` ADD COLUMN `dataUltimaCompra` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `PatrimonioProdutos` ADD COLUMN `produtoId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `PatrimonioProdutosMovimentos` ADD COLUMN `motivoAjuste` VARCHAR(191) NULL,
    ADD COLUMN `notaFiscal` VARCHAR(191) NULL,
    ADD COLUMN `valorUnitario` DOUBLE NOT NULL,
    MODIFY `tipo` ENUM('entrada', 'saida', 'ajuste') NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `PatrimonioProdutos_produtoId_key` ON `PatrimonioProdutos`(`produtoId`);
