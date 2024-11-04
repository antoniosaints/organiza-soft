/*
  Warnings:

  - A unique constraint covering the columns `[contaSistemaId,cpfCnpj]` on the table `Cliente` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Cliente` ADD COLUMN `canalPreferidoContato` ENUM('email', 'telefone', 'whatsapp', 'instagram', 'facebook', 'twitter', 'telegram', 'sms', 'chat', 'linkedin', 'skype', 'correio', 'outro') NOT NULL DEFAULT 'telefone',
    ADD COLUMN `cep` VARCHAR(191) NULL,
    ADD COLUMN `cidade` VARCHAR(100) NULL,
    ADD COLUMN `cpfCnpj` VARCHAR(191) NULL,
    ADD COLUMN `dataUltimaCompra` DATETIME(3) NULL,
    ADD COLUMN `estado` CHAR(2) NULL,
    ADD COLUMN `instagram` VARCHAR(191) NULL,
    ADD COLUMN `limiteCredito` DOUBLE NULL DEFAULT 0,
    ADD COLUMN `pais` VARCHAR(40) NULL,
    ADD COLUMN `saldoDevedor` DOUBLE NULL DEFAULT 0,
    ADD COLUMN `scoreFinanceiro` INTEGER NULL,
    ADD COLUMN `segmento` VARCHAR(191) NULL,
    ADD COLUMN `site` VARCHAR(191) NULL,
    ADD COLUMN `telefoneAlternativo` VARCHAR(191) NULL,
    ADD COLUMN `tipoCliente` ENUM('fisica', 'juridica') NOT NULL DEFAULT 'fisica';

-- CreateIndex
CREATE UNIQUE INDEX `uniqueContaIdECpfCnpj` ON `Cliente`(`contaSistemaId`, `cpfCnpj`);
