-- AlterTable
ALTER TABLE `ContasSistema` ADD COLUMN `plano` ENUM('free', 'pro') NOT NULL DEFAULT 'free',
    MODIFY `status` ENUM('ativa', 'inativa') NOT NULL DEFAULT 'ativa';
