/*
  Warnings:

  - You are about to drop the column `categoriasId` on the `FinanceiroTransacao` table. All the data in the column will be lost.
  - You are about to drop the column `formaPagamentoId` on the `FinanceiroTransacao` table. All the data in the column will be lost.
  - You are about to drop the `FianceiroFormasPagamento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FinanceiroParcelas` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoriaId` to the `FinanceiroTransacao` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `FianceiroFormasPagamento` DROP FOREIGN KEY `FianceiroFormasPagamento_contaSistemaId_fkey`;

-- DropForeignKey
ALTER TABLE `FinanceiroParcelas` DROP FOREIGN KEY `FinanceiroParcelas_contaSistemaId_fkey`;

-- DropForeignKey
ALTER TABLE `FinanceiroTransacao` DROP FOREIGN KEY `FinanceiroTransacao_categoriasId_fkey`;

-- DropForeignKey
ALTER TABLE `FinanceiroTransacao` DROP FOREIGN KEY `FinanceiroTransacao_formaPagamentoId_fkey`;

-- AlterTable
ALTER TABLE `FinanceiroTransacao` DROP COLUMN `categoriasId`,
    DROP COLUMN `formaPagamentoId`,
    ADD COLUMN `categoriaId` INTEGER NOT NULL,
    ADD COLUMN `fornecedorId` INTEGER NULL,
    ADD COLUMN `metodoPagamento` VARCHAR(50) NULL;

-- DropTable
DROP TABLE `FianceiroFormasPagamento`;

-- DropTable
DROP TABLE `FinanceiroParcelas`;

-- CreateIndex
CREATE INDEX `Transacao_categoriasId_fkey` ON `FinanceiroTransacao`(`categoriaId`);

-- AddForeignKey
ALTER TABLE `FinanceiroTransacao` ADD CONSTRAINT `FinanceiroTransacao_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `FinanceiroCategorias`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
