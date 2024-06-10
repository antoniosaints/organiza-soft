/*
  Warnings:

  - You are about to drop the column `tipo` on the `Transacao` table. All the data in the column will be lost.
  - Added the required column `categoriasId` to the `Transacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contaId` to the `Transacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `formaPagamentoId` to the `Transacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `natureza` to the `Transacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `operacao` to the `Transacao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Transacao` DROP COLUMN `tipo`,
    ADD COLUMN `categoriasId` INTEGER NOT NULL,
    ADD COLUMN `contaId` INTEGER NOT NULL,
    ADD COLUMN `dataEfetivado` DATETIME(3) NULL,
    ADD COLUMN `dataLancamento` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `desconto` DOUBLE NULL DEFAULT 0,
    ADD COLUMN `formaPagamentoId` INTEGER NOT NULL,
    ADD COLUMN `natureza` ENUM('receita', 'despesa') NOT NULL,
    ADD COLUMN `operacao` ENUM('entrada', 'saida', 'transferencia', 'ajuste') NOT NULL,
    ADD COLUMN `parcelado` ENUM('sim', 'nao') NOT NULL DEFAULT 'nao',
    ADD COLUMN `parcelamentoId` INTEGER NULL DEFAULT 0,
    ADD COLUMN `planoId` INTEGER NULL,
    ADD COLUMN `servicoId` INTEGER NULL,
    ADD COLUMN `status` ENUM('recebido', 'pendente') NOT NULL DEFAULT 'pendente',
    ADD COLUMN `valorFinal` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `valor` DOUBLE NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `Parcelas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `quantidade` INTEGER NOT NULL DEFAULT 1,
    `periodo` ENUM('mensal', 'semanal', 'diario', 'anual') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Parcelamento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `transacaoId` INTEGER NOT NULL,
    `parcela` INTEGER NOT NULL,
    `status` ENUM('recebido', 'pendente') NOT NULL DEFAULT 'pendente',
    `valor` DOUBLE NOT NULL,
    `valorRecebido` DOUBLE NULL,
    `dataRecebimento` DATETIME(3) NULL,
    `dataCadastro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FormasPagamento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `forma` VARCHAR(191) NOT NULL,
    `cor` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categorias` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoria` VARCHAR(191) NOT NULL,
    `cor` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `conta` VARCHAR(200) NOT NULL,
    `saldo` DOUBLE NOT NULL DEFAULT 0,
    `regra` ENUM('publica', 'privada') NOT NULL DEFAULT 'privada',
    `userId` INTEGER NOT NULL,
    `cor` VARCHAR(191) NULL,
    `descricao` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Transacao` ADD CONSTRAINT `Transacao_contaId_fkey` FOREIGN KEY (`contaId`) REFERENCES `Contas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transacao` ADD CONSTRAINT `Transacao_formaPagamentoId_fkey` FOREIGN KEY (`formaPagamentoId`) REFERENCES `FormasPagamento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transacao` ADD CONSTRAINT `Transacao_categoriasId_fkey` FOREIGN KEY (`categoriasId`) REFERENCES `Categorias`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Parcelamento` ADD CONSTRAINT `Parcelamento_transacaoId_fkey` FOREIGN KEY (`transacaoId`) REFERENCES `Transacao`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contas` ADD CONSTRAINT `Contas_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
