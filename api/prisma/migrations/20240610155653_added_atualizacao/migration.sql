/*
  Warnings:

  - Added the required column `dataAtualizacao` to the `Plano` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Plano` ADD COLUMN `dataAtualizacao` DATETIME(3) NOT NULL;
