-- AddForeignKey
ALTER TABLE `VendasRelatorios` ADD CONSTRAINT `VendasRelatorios_produtoId_fkey` FOREIGN KEY (`produtoId`) REFERENCES `PatrimonioProdutos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
