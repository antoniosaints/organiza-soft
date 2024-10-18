-- AlterTable
ALTER TABLE `ContasSistema` MODIFY `status` ENUM('ativa', 'vencida', 'cancelada', 'inativa') NOT NULL DEFAULT 'ativa';
