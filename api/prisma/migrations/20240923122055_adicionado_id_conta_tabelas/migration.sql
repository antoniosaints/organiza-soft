/*
  Warnings:

  - You are about to drop the column `user_create_id` on the `ContasSistema` table. All the data in the column will be lost.
  - Added the required column `contaSistemaId` to the `Assinatura` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contaSistemaId` to the `Bloqueio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contaSistemaId` to the `Configuracoes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contaSistemaId` to the `Parcelamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contaSistemaId` to the `Plano` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ContasSistema` DROP FOREIGN KEY `ContasSistema_user_create_id_fkey`;

-- AlterTable
ALTER TABLE `Assinatura` ADD COLUMN `contaSistemaId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Bloqueio` ADD COLUMN `contaSistemaId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Categorias` ADD COLUMN `contaSistemaId` INTEGER NOT NULL DEFAULT 2;

-- AlterTable
ALTER TABLE `Cliente` ADD COLUMN `contaSistemaId` INTEGER NOT NULL DEFAULT 2;

-- AlterTable
ALTER TABLE `Configuracoes` ADD COLUMN `contaSistemaId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Contas` ADD COLUMN `contaSistemaId` INTEGER NOT NULL DEFAULT 2;

-- AlterTable
ALTER TABLE `ContasSistema` DROP COLUMN `user_create_id`,
    MODIFY `plano` ENUM('free', 'pro', 'admin') NOT NULL DEFAULT 'free';

-- AlterTable
ALTER TABLE `FormasPagamento` ADD COLUMN `contaSistemaId` INTEGER NOT NULL DEFAULT 2;

-- AlterTable
ALTER TABLE `Parcelamento` ADD COLUMN `contaSistemaId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Parcelas` ADD COLUMN `contaSistemaId` INTEGER NOT NULL DEFAULT 2;

-- AlterTable
ALTER TABLE `Plano` ADD COLUMN `contaSistemaId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Transacao` ADD COLUMN `contaSistemaId` INTEGER NOT NULL DEFAULT 2;

-- AlterTable
ALTER TABLE `Usuario` ADD COLUMN `contaSistemaId` INTEGER NOT NULL DEFAULT 2;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_contaSistemaId_fkey` FOREIGN KEY (`contaSistemaId`) REFERENCES `ContasSistema`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cliente` ADD CONSTRAINT `Cliente_contaSistemaId_fkey` FOREIGN KEY (`contaSistemaId`) REFERENCES `ContasSistema`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Plano` ADD CONSTRAINT `Plano_contaSistemaId_fkey` FOREIGN KEY (`contaSistemaId`) REFERENCES `ContasSistema`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Assinatura` ADD CONSTRAINT `Assinatura_contaSistemaId_fkey` FOREIGN KEY (`contaSistemaId`) REFERENCES `ContasSistema`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transacao` ADD CONSTRAINT `Transacao_contaSistemaId_fkey` FOREIGN KEY (`contaSistemaId`) REFERENCES `ContasSistema`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Parcelas` ADD CONSTRAINT `Parcelas_contaSistemaId_fkey` FOREIGN KEY (`contaSistemaId`) REFERENCES `ContasSistema`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Configuracoes` ADD CONSTRAINT `Configuracoes_contaSistemaId_fkey` FOREIGN KEY (`contaSistemaId`) REFERENCES `ContasSistema`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Parcelamento` ADD CONSTRAINT `Parcelamento_contaSistemaId_fkey` FOREIGN KEY (`contaSistemaId`) REFERENCES `ContasSistema`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FormasPagamento` ADD CONSTRAINT `FormasPagamento_contaSistemaId_fkey` FOREIGN KEY (`contaSistemaId`) REFERENCES `ContasSistema`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Categorias` ADD CONSTRAINT `Categorias_contaSistemaId_fkey` FOREIGN KEY (`contaSistemaId`) REFERENCES `ContasSistema`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contas` ADD CONSTRAINT `Contas_contaSistemaId_fkey` FOREIGN KEY (`contaSistemaId`) REFERENCES `ContasSistema`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bloqueio` ADD CONSTRAINT `Bloqueio_contaSistemaId_fkey` FOREIGN KEY (`contaSistemaId`) REFERENCES `ContasSistema`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
