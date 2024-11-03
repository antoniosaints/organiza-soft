-- CreateTable
CREATE TABLE `VendasOnLancamentos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `vendaId` INTEGER NOT NULL,
    `lancamentoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `VendasOnLancamentos` ADD CONSTRAINT `VendasOnLancamentos_vendaId_fkey` FOREIGN KEY (`vendaId`) REFERENCES `Vendas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VendasOnLancamentos` ADD CONSTRAINT `VendasOnLancamentos_lancamentoId_fkey` FOREIGN KEY (`lancamentoId`) REFERENCES `FinanceiroTransacao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
