-- AlterTable
ALTER TABLE `AssinaturaPlano` ADD COLUMN `periodoCobranca` ENUM('mensal', 'diario', 'anual', 'semestral', 'semanal', 'quinzenal') NOT NULL DEFAULT 'mensal';
