/*
  Warnings:

  - Added the required column `cpf_cnpj` to the `PatrimonioFornecedores` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `PatrimonioFornecedores` ADD COLUMN `cpf_cnpj` VARCHAR(191) NOT NULL;
