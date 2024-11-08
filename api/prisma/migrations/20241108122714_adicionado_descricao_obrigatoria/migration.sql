/*
  Warnings:

  - Made the column `descricao` on table `FinanceiroTransacao` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `FinanceiroTransacao` MODIFY `descricao` TEXT NOT NULL;
