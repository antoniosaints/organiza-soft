/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `ContasSistema` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `ContasSistema_email_key` ON `ContasSistema`(`email`);
