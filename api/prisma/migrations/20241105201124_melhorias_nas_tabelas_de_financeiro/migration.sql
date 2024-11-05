/*
  Warnings:

  - Added the required column `dataVencimento` to the `FinanceiroParcelamento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `FinanceiroParcelamento` ADD COLUMN `dataVencimento` DATETIME(3) NOT NULL,
    ADD COLUMN `tipo` ENUM('entrada', 'parcela', 'ajuste') NOT NULL DEFAULT 'parcela';
