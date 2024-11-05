/*
  Warnings:

  - A unique constraint covering the columns `[uniqueId]` on the table `Vendas` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Vendas_uniqueId_key` ON `Vendas`(`uniqueId`);
