-- AlterTable
ALTER TABLE `ContasSistema` MODIFY `status` ENUM('ativa', 'vencida', 'inativa') NOT NULL DEFAULT 'ativa';
