/*
  Warnings:

  - Made the column `dataBloqueio` on table `AssinaturaBloqueio` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Assinatura` MODIFY `dataFim` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `AssinaturaBloqueio` MODIFY `dataBloqueio` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `AssinaturaItem` MODIFY `tipo` ENUM('servico', 'produto', 'outro') NOT NULL;

-- AlterTable
ALTER TABLE `Cliente` ADD COLUMN `latitudeLongitude` VARCHAR(40) NULL;
