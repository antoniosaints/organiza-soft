-- AlterTable
ALTER TABLE `PatrimonioFornecedores` ADD COLUMN `status` ENUM('ativo', 'inativo') NOT NULL DEFAULT 'ativo';
