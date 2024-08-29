/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Assinatura` table. All the data in the column will be lost.
  - You are about to drop the column `clienteId` on the `Bloqueio` table. All the data in the column will be lost.
  - The primary key for the `PermissoesOnGrupos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdBy` on the `PermissoesOnGrupos` table. All the data in the column will be lost.
  - You are about to drop the column `permissaoId` on the `PermissoesOnGrupos` table. All the data in the column will be lost.
  - You are about to drop the column `data` on the `Transacao` table. All the data in the column will be lost.
  - You are about to drop the `UsuariosOnGrupos` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Permissoes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dataDesbloqueio` to the `Assinatura` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assinaturaId` to the `Bloqueio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Permissoes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `permissaoSlug` to the `PermissoesOnGrupos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grupoId` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Bloqueio` DROP FOREIGN KEY `Bloqueio_clienteId_fkey`;

-- DropForeignKey
ALTER TABLE `PermissoesOnGrupos` DROP FOREIGN KEY `PermissoesOnGrupos_permissaoId_fkey`;

-- DropForeignKey
ALTER TABLE `UsuariosOnGrupos` DROP FOREIGN KEY `UsuariosOnGrupos_grupoId_fkey`;

-- DropForeignKey
ALTER TABLE `UsuariosOnGrupos` DROP FOREIGN KEY `UsuariosOnGrupos_usuarioId_fkey`;

-- AlterTable
ALTER TABLE `Assinatura` DROP COLUMN `createdAt`,
    ADD COLUMN `dataBloqueio` DATETIME(3) NULL,
    ADD COLUMN `dataCriacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `dataDesbloqueio` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Bloqueio` DROP COLUMN `clienteId`,
    ADD COLUMN `assinaturaId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Grupos` ADD COLUMN `cor` VARCHAR(191) NULL DEFAULT 'white';

-- AlterTable
ALTER TABLE `Parcelamento` MODIFY `status` ENUM('recebido', 'pendente', 'cancelada') NOT NULL DEFAULT 'pendente';

-- AlterTable
ALTER TABLE `Permissoes` ADD COLUMN `slug` VARCHAR(191) NOT NULL,
    MODIFY `cor` VARCHAR(191) NULL DEFAULT 'white',
    MODIFY `status` ENUM('ativo', 'inativo') NOT NULL DEFAULT 'ativo';

-- AlterTable
ALTER TABLE `PermissoesOnGrupos` DROP PRIMARY KEY,
    DROP COLUMN `createdBy`,
    DROP COLUMN `permissaoId`,
    ADD COLUMN `permissaoSlug` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`permissaoSlug`, `grupoId`);

-- AlterTable
ALTER TABLE `Transacao` DROP COLUMN `data`,
    MODIFY `status` ENUM('recebido', 'pendente', 'cancelada') NOT NULL DEFAULT 'pendente';

-- AlterTable
ALTER TABLE `Usuario` ADD COLUMN `grupoId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `UsuariosOnGrupos`;

-- CreateTable
CREATE TABLE `Configuracoes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `chave` VARCHAR(191) NOT NULL,
    `valor` VARCHAR(191) NOT NULL,
    `dataCriacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Bloqueio_assinaturaId_fkey` ON `Bloqueio`(`assinaturaId`);

-- CreateIndex
CREATE UNIQUE INDEX `Permissoes_slug_key` ON `Permissoes`(`slug`);

-- CreateIndex
CREATE INDEX `Usuario_grupoId_fkey` ON `Usuario`(`grupoId`);

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_grupoId_fkey` FOREIGN KEY (`grupoId`) REFERENCES `Grupos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PermissoesOnGrupos` ADD CONSTRAINT `PermissoesOnGrupos_permissaoSlug_fkey` FOREIGN KEY (`permissaoSlug`) REFERENCES `Permissoes`(`slug`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bloqueio` ADD CONSTRAINT `Bloqueio_assinaturaId_fkey` FOREIGN KEY (`assinaturaId`) REFERENCES `Assinatura`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
