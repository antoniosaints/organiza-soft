-- CreateTable
CREATE TABLE `IntegracoesGateways` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `contaSistemaId` INTEGER NOT NULL,
    `gatewayName` VARCHAR(100) NOT NULL,
    `descricao` TEXT NULL,
    `apiKey` VARCHAR(250) NOT NULL,
    `apiSecret` VARCHAR(250) NULL,
    `webhook` VARCHAR(255) NULL,
    `dataCriacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dataAtualizacao` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `IntegracoesGateways` ADD CONSTRAINT `IntegracoesGateways_contaSistemaId_fkey` FOREIGN KEY (`contaSistemaId`) REFERENCES `ContasSistema`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
