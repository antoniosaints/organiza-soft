-- CreateTable
CREATE TABLE `AssinaturaItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `contaSistemaId` INTEGER NOT NULL,
    `nome` VARCHAR(100) NOT NULL,
    `valor` DOUBLE NOT NULL,
    `tipo` ENUM('servico', 'produto') NOT NULL,
    `descricao` TEXT NULL,
    `dataCriacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dataAtualizado` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AssinaturaItemOnPlano` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `item` INTEGER NOT NULL,
    `qtdItens` DOUBLE NOT NULL,
    `plano` INTEGER NOT NULL,

    UNIQUE INDEX `AssinaturaItemOnPlano_item_plano_key`(`item`, `plano`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AssinaturaItem` ADD CONSTRAINT `AssinaturaItem_contaSistemaId_fkey` FOREIGN KEY (`contaSistemaId`) REFERENCES `ContasSistema`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssinaturaItemOnPlano` ADD CONSTRAINT `AssinaturaItemOnPlano_plano_fkey` FOREIGN KEY (`plano`) REFERENCES `AssinaturaPlano`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssinaturaItemOnPlano` ADD CONSTRAINT `AssinaturaItemOnPlano_item_fkey` FOREIGN KEY (`item`) REFERENCES `AssinaturaItem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
