/*
  Warnings:

  - Added the required column `quantidade` to the `VendasRelatorios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `VendasRelatorios` ADD COLUMN `quantidade` DOUBLE NOT NULL;
