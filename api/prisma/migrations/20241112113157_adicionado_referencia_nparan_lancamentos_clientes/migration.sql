/*
  Warnings:

  - You are about to drop the column `fornecedorId` on the `FinanceiroTransacao` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `FinanceiroTransacao` DROP COLUMN `fornecedorId`;

-- CreateTable
CREATE TABLE `ClienteOnLancamentos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clienteId` INTEGER NOT NULL,
    `lancamentoId` INTEGER NOT NULL,
    `contaSistemaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ClienteOnLancamentos` ADD CONSTRAINT `ClienteOnLancamentos_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ClienteOnLancamentos` ADD CONSTRAINT `ClienteOnLancamentos_lancamentoId_fkey` FOREIGN KEY (`lancamentoId`) REFERENCES `FinanceiroTransacao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ClienteOnLancamentos` ADD CONSTRAINT `ClienteOnLancamentos_contaSistemaId_fkey` FOREIGN KEY (`contaSistemaId`) REFERENCES `ContasSistema`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
