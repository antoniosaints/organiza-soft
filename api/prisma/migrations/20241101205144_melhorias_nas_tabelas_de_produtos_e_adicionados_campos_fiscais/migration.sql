/*
  Warnings:

  - A unique constraint covering the columns `[codigoBarra]` on the table `PatrimonioProdutos` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `PatrimonioProdutos` ADD COLUMN `cest` VARCHAR(10) NULL,
    ADD COLUMN `cfop` INTEGER NULL,
    ADD COLUMN `codigoBarra` VARCHAR(50) NULL,
    ADD COLUMN `controlado` ENUM('sim', 'nao') NOT NULL DEFAULT 'nao',
    ADD COLUMN `cst` VARCHAR(5) NULL,
    ADD COLUMN `ncm` VARCHAR(10) NULL,
    ADD COLUMN `origem` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `produzido` ENUM('sim', 'nao') NOT NULL DEFAULT 'nao',
    ADD COLUMN `unidade` VARCHAR(191) NOT NULL DEFAULT 'UN';

-- AlterTable
ALTER TABLE `PatrimonioProdutosEstoques` ADD COLUMN `pdv` ENUM('sim', 'nao') NOT NULL DEFAULT 'nao';

-- CreateIndex
CREATE UNIQUE INDEX `PatrimonioProdutos_codigoBarra_key` ON `PatrimonioProdutos`(`codigoBarra`);
