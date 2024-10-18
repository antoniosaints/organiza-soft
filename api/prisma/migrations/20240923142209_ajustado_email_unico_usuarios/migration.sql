/*
  Warnings:

  - A unique constraint covering the columns `[email,contaSistemaId]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Usuario_email_key` ON `Usuario`;

-- CreateIndex
CREATE UNIQUE INDEX `Usuario_email_contaSistemaId_key` ON `Usuario`(`email`, `contaSistemaId`);
