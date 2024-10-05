/*
  Warnings:

  - You are about to drop the column `grupoId` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the `Permissoes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PermissoesGrupos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PermissoesOnGrupos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `PermissoesOnGrupos` DROP FOREIGN KEY `PermissoesOnGrupos_grupoId_fkey`;

-- DropForeignKey
ALTER TABLE `PermissoesOnGrupos` DROP FOREIGN KEY `PermissoesOnGrupos_permissaoSlug_fkey`;

-- DropForeignKey
ALTER TABLE `Usuario` DROP FOREIGN KEY `Usuario_grupoId_fkey`;

-- AlterTable
ALTER TABLE `Usuario` DROP COLUMN `grupoId`;

-- DropTable
DROP TABLE `Permissoes`;

-- DropTable
DROP TABLE `PermissoesGrupos`;

-- DropTable
DROP TABLE `PermissoesOnGrupos`;
