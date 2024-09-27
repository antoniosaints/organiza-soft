/*
  Warnings:

  - You are about to drop the `Bloqueio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Categorias` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Contas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FormasPagamento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Grupos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Parcelamento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Parcelas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Plano` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transacao` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Assinatura` DROP FOREIGN KEY `Assinatura_planoId_fkey`;

-- DropForeignKey
ALTER TABLE `Bloqueio` DROP FOREIGN KEY `Bloqueio_assinaturaId_fkey`;

-- DropForeignKey
ALTER TABLE `Bloqueio` DROP FOREIGN KEY `Bloqueio_contaSistemaId_fkey`;

-- DropForeignKey
ALTER TABLE `Categorias` DROP FOREIGN KEY `Categorias_contaSistemaId_fkey`;

-- DropForeignKey
ALTER TABLE `Contas` DROP FOREIGN KEY `Contas_contaSistemaId_fkey`;

-- DropForeignKey
ALTER TABLE `Contas` DROP FOREIGN KEY `Contas_userId_fkey`;

-- DropForeignKey
ALTER TABLE `FormasPagamento` DROP FOREIGN KEY `FormasPagamento_contaSistemaId_fkey`;

-- DropForeignKey
ALTER TABLE `Parcelamento` DROP FOREIGN KEY `Parcelamento_contaSistemaId_fkey`;

-- DropForeignKey
ALTER TABLE `Parcelamento` DROP FOREIGN KEY `Parcelamento_transacaoId_fkey`;

-- DropForeignKey
ALTER TABLE `Parcelas` DROP FOREIGN KEY `Parcelas_contaSistemaId_fkey`;

-- DropForeignKey
ALTER TABLE `PermissoesOnGrupos` DROP FOREIGN KEY `PermissoesOnGrupos_grupoId_fkey`;

-- DropForeignKey
ALTER TABLE `Plano` DROP FOREIGN KEY `Plano_contaSistemaId_fkey`;

-- DropForeignKey
ALTER TABLE `Transacao` DROP FOREIGN KEY `Transacao_categoriasId_fkey`;

-- DropForeignKey
ALTER TABLE `Transacao` DROP FOREIGN KEY `Transacao_clienteId_fkey`;

-- DropForeignKey
ALTER TABLE `Transacao` DROP FOREIGN KEY `Transacao_contaId_fkey`;

-- DropForeignKey
ALTER TABLE `Transacao` DROP FOREIGN KEY `Transacao_contaSistemaId_fkey`;

-- DropForeignKey
ALTER TABLE `Transacao` DROP FOREIGN KEY `Transacao_formaPagamentoId_fkey`;

-- DropForeignKey
ALTER TABLE `Usuario` DROP FOREIGN KEY `Usuario_grupoId_fkey`;

-- DropTable
DROP TABLE `Bloqueio`;

-- DropTable
DROP TABLE `Categorias`;

-- DropTable
DROP TABLE `Contas`;

-- DropTable
DROP TABLE `FormasPagamento`;

-- DropTable
DROP TABLE `Grupos`;

-- DropTable
DROP TABLE `Parcelamento`;

-- DropTable
DROP TABLE `Parcelas`;

-- DropTable
DROP TABLE `Plano`;

-- DropTable
DROP TABLE `Transacao`;

-- CreateTable
CREATE TABLE `PermissoesGrupos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `grupo` VARCHAR(100) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `cor` VARCHAR(191) NULL DEFAULT 'white',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AssinaturaPlano` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `contaSistemaId` INTEGER NOT NULL,
    `nome` VARCHAR(100) NOT NULL,
    `descricao` TEXT NULL,
    `preco` DOUBLE NOT NULL,
    `cor` VARCHAR(191) NOT NULL,
    `dataCriacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dataAtualizacao` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AssinaturaBloqueio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `contaSistemaId` INTEGER NOT NULL,
    `motivo` TEXT NOT NULL,
    `dataBloqueio` DATETIME(3) NOT NULL,
    `dataDesbloqueio` DATETIME(3) NULL,
    `assinaturaId` INTEGER NOT NULL,

    INDEX `Bloqueio_assinaturaId_fkey`(`assinaturaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FinanceiroTransacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `contaSistemaId` INTEGER NOT NULL DEFAULT 1,
    `clienteId` INTEGER NOT NULL,
    `valor` DOUBLE NOT NULL DEFAULT 0,
    `descricao` TEXT NULL,
    `categoriasId` INTEGER NOT NULL,
    `contaId` INTEGER NOT NULL,
    `dataEfetivado` DATETIME(3) NULL,
    `dataLancamento` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `desconto` DOUBLE NULL DEFAULT 0,
    `formaPagamentoId` INTEGER NOT NULL,
    `natureza` ENUM('receita', 'despesa') NOT NULL,
    `operacao` ENUM('entrada', 'saida', 'transferencia', 'ajuste') NOT NULL,
    `parcelado` ENUM('sim', 'nao') NOT NULL DEFAULT 'nao',
    `status` ENUM('recebido', 'pendente', 'cancelada') NOT NULL DEFAULT 'pendente',
    `valorFinal` DOUBLE NOT NULL DEFAULT 0,

    INDEX `Transacao_categoriasId_fkey`(`categoriasId`),
    INDEX `Transacao_clienteId_fkey`(`clienteId`),
    INDEX `Transacao_contaId_fkey`(`contaId`),
    INDEX `Transacao_formaPagamentoId_fkey`(`formaPagamentoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FinanceiroParcelas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `contaSistemaId` INTEGER NOT NULL DEFAULT 1,
    `nome` VARCHAR(191) NOT NULL,
    `quantidade` INTEGER NOT NULL DEFAULT 1,
    `periodo` ENUM('mensal', 'semanal', 'diario', 'anual') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FinanceiroParcelamento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `contaSistemaId` INTEGER NOT NULL,
    `transacaoId` INTEGER NOT NULL,
    `parcela` INTEGER NOT NULL,
    `status` ENUM('recebido', 'pendente', 'cancelada') NOT NULL DEFAULT 'pendente',
    `valor` DOUBLE NOT NULL,
    `desconto` DOUBLE NULL,
    `valorRecebido` DOUBLE NULL,
    `dataRecebimento` DATETIME(3) NULL,
    `dataCadastro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Parcelamento_transacaoId_fkey`(`transacaoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FianceiroFormasPagamento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `contaSistemaId` INTEGER NOT NULL DEFAULT 1,
    `forma` VARCHAR(191) NOT NULL,
    `cor` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FinanceiroCategorias` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `contaSistemaId` INTEGER NOT NULL DEFAULT 1,
    `categoria` VARCHAR(191) NOT NULL,
    `cor` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FinanceiroContas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `contaSistemaId` INTEGER NOT NULL DEFAULT 1,
    `conta` VARCHAR(200) NOT NULL,
    `saldo` DOUBLE NOT NULL DEFAULT 0,
    `regra` ENUM('publica', 'privada') NOT NULL DEFAULT 'privada',
    `userId` INTEGER NOT NULL,
    `cor` VARCHAR(191) NULL,
    `descricao` TEXT NOT NULL,

    INDEX `Contas_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PatrimonioProdutos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `produto` VARCHAR(191) NOT NULL,
    `descricao` TEXT NOT NULL,
    `sku` VARCHAR(191) NOT NULL,
    `preco` DOUBLE NOT NULL,
    `dataCriado` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dataAtualizado` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PatrimonioArmazenamentos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `armazen` VARCHAR(191) NOT NULL,
    `local` VARCHAR(191) NULL,
    `dataCriado` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dataAtualizado` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PatrimonioProdutosEstoques` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `produtoId` INTEGER NOT NULL,
    `armazenId` INTEGER NOT NULL,
    `estoqueMinimo` INTEGER NOT NULL,
    `quantidade` INTEGER NOT NULL DEFAULT 0,
    `dataCriado` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dataAtualizado` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PatrimonioProdutosEstoques_produtoId_armazenId_key`(`produtoId`, `armazenId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PatrimonioProdutosMovimentos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `produtoId` INTEGER NOT NULL,
    `armazenId` INTEGER NOT NULL,
    `tipo` ENUM('entrada', 'saida') NOT NULL,
    `quantidade` INTEGER NOT NULL,
    `dataMovimento` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `descricao` VARCHAR(191) NULL,

    INDEX `PatrimonioProdutosMovimentos_produtoId_idx`(`produtoId`),
    INDEX `PatrimonioProdutosMovimentos_armazenId_idx`(`armazenId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PatrimonioFornecedores` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `contato` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `descricao` TEXT NULL,
    `dataCriado` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dataAtualizado` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PatrimonioComprasFornecedores` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `produtoId` INTEGER NOT NULL,
    `fornecedorId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_grupoId_fkey` FOREIGN KEY (`grupoId`) REFERENCES `PermissoesGrupos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PermissoesOnGrupos` ADD CONSTRAINT `PermissoesOnGrupos_grupoId_fkey` FOREIGN KEY (`grupoId`) REFERENCES `PermissoesGrupos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Assinatura` ADD CONSTRAINT `Assinatura_planoId_fkey` FOREIGN KEY (`planoId`) REFERENCES `AssinaturaPlano`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssinaturaPlano` ADD CONSTRAINT `AssinaturaPlano_contaSistemaId_fkey` FOREIGN KEY (`contaSistemaId`) REFERENCES `ContasSistema`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssinaturaBloqueio` ADD CONSTRAINT `AssinaturaBloqueio_contaSistemaId_fkey` FOREIGN KEY (`contaSistemaId`) REFERENCES `ContasSistema`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssinaturaBloqueio` ADD CONSTRAINT `AssinaturaBloqueio_assinaturaId_fkey` FOREIGN KEY (`assinaturaId`) REFERENCES `Assinatura`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FinanceiroTransacao` ADD CONSTRAINT `FinanceiroTransacao_contaSistemaId_fkey` FOREIGN KEY (`contaSistemaId`) REFERENCES `ContasSistema`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FinanceiroTransacao` ADD CONSTRAINT `FinanceiroTransacao_categoriasId_fkey` FOREIGN KEY (`categoriasId`) REFERENCES `FinanceiroCategorias`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FinanceiroTransacao` ADD CONSTRAINT `FinanceiroTransacao_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FinanceiroTransacao` ADD CONSTRAINT `FinanceiroTransacao_contaId_fkey` FOREIGN KEY (`contaId`) REFERENCES `FinanceiroContas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FinanceiroTransacao` ADD CONSTRAINT `FinanceiroTransacao_formaPagamentoId_fkey` FOREIGN KEY (`formaPagamentoId`) REFERENCES `FianceiroFormasPagamento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FinanceiroParcelas` ADD CONSTRAINT `FinanceiroParcelas_contaSistemaId_fkey` FOREIGN KEY (`contaSistemaId`) REFERENCES `ContasSistema`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FinanceiroParcelamento` ADD CONSTRAINT `FinanceiroParcelamento_contaSistemaId_fkey` FOREIGN KEY (`contaSistemaId`) REFERENCES `ContasSistema`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FinanceiroParcelamento` ADD CONSTRAINT `FinanceiroParcelamento_transacaoId_fkey` FOREIGN KEY (`transacaoId`) REFERENCES `FinanceiroTransacao`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FianceiroFormasPagamento` ADD CONSTRAINT `FianceiroFormasPagamento_contaSistemaId_fkey` FOREIGN KEY (`contaSistemaId`) REFERENCES `ContasSistema`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FinanceiroCategorias` ADD CONSTRAINT `FinanceiroCategorias_contaSistemaId_fkey` FOREIGN KEY (`contaSistemaId`) REFERENCES `ContasSistema`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FinanceiroContas` ADD CONSTRAINT `FinanceiroContas_contaSistemaId_fkey` FOREIGN KEY (`contaSistemaId`) REFERENCES `ContasSistema`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FinanceiroContas` ADD CONSTRAINT `FinanceiroContas_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PatrimonioProdutosEstoques` ADD CONSTRAINT `PatrimonioProdutosEstoques_produtoId_fkey` FOREIGN KEY (`produtoId`) REFERENCES `PatrimonioProdutos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PatrimonioProdutosEstoques` ADD CONSTRAINT `PatrimonioProdutosEstoques_armazenId_fkey` FOREIGN KEY (`armazenId`) REFERENCES `PatrimonioArmazenamentos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PatrimonioProdutosMovimentos` ADD CONSTRAINT `PatrimonioProdutosMovimentos_produtoId_fkey` FOREIGN KEY (`produtoId`) REFERENCES `PatrimonioProdutos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PatrimonioProdutosMovimentos` ADD CONSTRAINT `PatrimonioProdutosMovimentos_armazenId_fkey` FOREIGN KEY (`armazenId`) REFERENCES `PatrimonioArmazenamentos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PatrimonioComprasFornecedores` ADD CONSTRAINT `PatrimonioComprasFornecedores_produtoId_fkey` FOREIGN KEY (`produtoId`) REFERENCES `PatrimonioProdutos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PatrimonioComprasFornecedores` ADD CONSTRAINT `PatrimonioComprasFornecedores_fornecedorId_fkey` FOREIGN KEY (`fornecedorId`) REFERENCES `PatrimonioFornecedores`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
