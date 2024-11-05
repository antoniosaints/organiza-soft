-- CreateTable
CREATE TABLE `Vendas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uniqueId` VARCHAR(191) NOT NULL,
    `contaSistemaId` INTEGER NOT NULL,
    `clienteId` INTEGER NOT NULL,
    `vendedorId` INTEGER NOT NULL,
    `valor` DOUBLE NOT NULL,
    `status` ENUM('pendente', 'cancelado', 'pago', 'estornado', 'processando') NOT NULL,
    `metodoPagamento` VARCHAR(50) NOT NULL,
    `dataCriacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dataAtualizada` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VendasRelatorios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `contaSistemaId` INTEGER NOT NULL,
    `vendaId` INTEGER NOT NULL,
    `produtoId` INTEGER NOT NULL,
    `produto` VARCHAR(191) NOT NULL,
    `valor` VARCHAR(191) NOT NULL,
    `preco` DOUBLE NOT NULL,
    `total` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VendasPagamentos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `contaSistemaId` INTEGER NOT NULL,
    `vendaId` INTEGER NOT NULL,
    `valor` DOUBLE NOT NULL,
    `metodoPagamento` VARCHAR(50) NOT NULL,
    `statusPagamento` ENUM('pendente', 'cancelado', 'pago', 'estornado', 'processando') NOT NULL,
    `gatewayId` VARCHAR(191) NOT NULL,
    `dataCriacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dataAtualizado` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Vendas` ADD CONSTRAINT `Vendas_contaSistemaId_fkey` FOREIGN KEY (`contaSistemaId`) REFERENCES `ContasSistema`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vendas` ADD CONSTRAINT `Vendas_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vendas` ADD CONSTRAINT `Vendas_vendedorId_fkey` FOREIGN KEY (`vendedorId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VendasRelatorios` ADD CONSTRAINT `VendasRelatorios_contaSistemaId_fkey` FOREIGN KEY (`contaSistemaId`) REFERENCES `ContasSistema`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VendasRelatorios` ADD CONSTRAINT `VendasRelatorios_vendaId_fkey` FOREIGN KEY (`vendaId`) REFERENCES `Vendas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VendasPagamentos` ADD CONSTRAINT `VendasPagamentos_contaSistemaId_fkey` FOREIGN KEY (`contaSistemaId`) REFERENCES `ContasSistema`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VendasPagamentos` ADD CONSTRAINT `VendasPagamentos_vendaId_fkey` FOREIGN KEY (`vendaId`) REFERENCES `Vendas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
