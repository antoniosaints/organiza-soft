-- DropForeignKey
ALTER TABLE `VendasPagamentos` DROP FOREIGN KEY `VendasPagamentos_vendaId_fkey`;

-- DropForeignKey
ALTER TABLE `VendasRelatorios` DROP FOREIGN KEY `VendasRelatorios_vendaId_fkey`;

-- AddForeignKey
ALTER TABLE `VendasRelatorios` ADD CONSTRAINT `VendasRelatorios_vendaId_fkey` FOREIGN KEY (`vendaId`) REFERENCES `Vendas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VendasPagamentos` ADD CONSTRAINT `VendasPagamentos_vendaId_fkey` FOREIGN KEY (`vendaId`) REFERENCES `Vendas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
