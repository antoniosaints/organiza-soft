-- DropForeignKey
ALTER TABLE `ClienteOnLancamentos` DROP FOREIGN KEY `ClienteOnLancamentos_lancamentoId_fkey`;

-- AddForeignKey
ALTER TABLE `ClienteOnLancamentos` ADD CONSTRAINT `ClienteOnLancamentos_lancamentoId_fkey` FOREIGN KEY (`lancamentoId`) REFERENCES `FinanceiroTransacao`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
