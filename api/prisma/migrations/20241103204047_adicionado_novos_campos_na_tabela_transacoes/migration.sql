/*
  Warnings:

  - You are about to drop the column `clienteId` on the `FinanceiroTransacao` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[codigoLancamento,contaSistemaId]` on the table `FinanceiroTransacao` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `codigoLancamento` to the `FinanceiroTransacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataVencimento` to the `FinanceiroTransacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioLancamento` to the `FinanceiroTransacao` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `FinanceiroTransacao` DROP FOREIGN KEY `FinanceiroTransacao_clienteId_fkey`;

-- AlterTable
ALTER TABLE `FinanceiroTransacao` DROP COLUMN `clienteId`,
    ADD COLUMN `codigoLancamento` VARCHAR(191) NOT NULL,
    ADD COLUMN `codigoNfe` VARCHAR(191) NULL,
    ADD COLUMN `codigo_servico` VARCHAR(191) NULL,
    ADD COLUMN `dataVencimento` DATETIME(3) NOT NULL,
    ADD COLUMN `juros` DOUBLE NULL DEFAULT 0,
    ADD COLUMN `moeda` VARCHAR(191) NULL DEFAULT 'BRL',
    ADD COLUMN `referenciaExterna` VARCHAR(191) NULL,
    ADD COLUMN `taxaCambio` DOUBLE NULL DEFAULT 0,
    ADD COLUMN `taxaDesconto` DOUBLE NULL DEFAULT 0,
    ADD COLUMN `taxaJuros` DOUBLE NULL DEFAULT 0,
    ADD COLUMN `usuarioEfetivou` INTEGER NULL,
    ADD COLUMN `usuarioLancamento` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `Transacao_datasIndex_fkey` ON `FinanceiroTransacao`(`dataLancamento`, `dataEfetivado`, `dataVencimento`);

-- CreateIndex
CREATE INDEX `Transacao_Status_fkey` ON `FinanceiroTransacao`(`status`);

-- CreateIndex
CREATE UNIQUE INDEX `FinanceiroTransacao_codigoLancamento_contaSistemaId_key` ON `FinanceiroTransacao`(`codigoLancamento`, `contaSistemaId`);

-- AddForeignKey
ALTER TABLE `FinanceiroTransacao` ADD CONSTRAINT `FinanceiroTransacao_usuarioLancamento_fkey` FOREIGN KEY (`usuarioLancamento`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
