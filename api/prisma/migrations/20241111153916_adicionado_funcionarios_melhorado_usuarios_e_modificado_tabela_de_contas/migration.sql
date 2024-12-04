-- AlterTable
ALTER TABLE `ContasSistema` ADD COLUMN `lancamentosRetroativos` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `monitorarEstoque` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `notificacaoEmail` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `notificacaoTelegram` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `redefinirSenha` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `Usuario` ADD COLUMN `assinantes` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `assistenteIa` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `crm` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `dashboardCrm` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `dashboardFinanceiro` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `dashboardPatrimonio` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `dashboardVendas` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `descontoMaximoLancamento` DOUBLE NOT NULL DEFAULT 1,
    ADD COLUMN `descontoMaximoVendaPdv` DOUBLE NOT NULL DEFAULT 1,
    ADD COLUMN `financeiro` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `jurosMaximoLancamento` DOUBLE NOT NULL DEFAULT 1,
    ADD COLUMN `jurosMaximoRenegociacao` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `lancamentosRetroativos` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `pagamentosRetroativos` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `patrimonio` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `recebimentosRetroativos` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `resetarSenha` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `rh` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `servicos` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `vendas` BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE `RecursosHumanosFuncionarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `contaSistemaId` INTEGER NOT NULL,
    `nome` VARCHAR(140) NOT NULL,
    `cpf` VARCHAR(150) NOT NULL,
    `dataNascimento` VARCHAR(50) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `telefone` VARCHAR(50) NOT NULL,
    `cargo` VARCHAR(100) NOT NULL,
    `dataAdmissao` DATETIME(3) NULL,
    `dataDemissao` DATETIME(3) NULL,
    `criadoPor` INTEGER NOT NULL,
    `status` ENUM('ativo', 'inativo') NOT NULL DEFAULT 'ativo',
    `datacriado` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dataAtualizado` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RecursosHumanosUsuariosInFuncionarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuarioId` INTEGER NOT NULL,
    `funcionarioId` INTEGER NOT NULL,
    `contaSistemaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EmailConfigs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(100) NOT NULL,
    `servidor` VARCHAR(140) NOT NULL,
    `porta` INTEGER NOT NULL,
    `emailRemetente` VARCHAR(100) NOT NULL,
    `senha` VARCHAR(140) NOT NULL,
    `contaSistemaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TelegramConfigs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bot` VARCHAR(100) NOT NULL,
    `botApiKey` VARCHAR(150) NOT NULL,
    `contaSistemaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RecursosHumanosFuncionarios` ADD CONSTRAINT `RecursosHumanosFuncionarios_contaSistemaId_fkey` FOREIGN KEY (`contaSistemaId`) REFERENCES `ContasSistema`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecursosHumanosFuncionarios` ADD CONSTRAINT `RecursosHumanosFuncionarios_criadoPor_fkey` FOREIGN KEY (`criadoPor`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecursosHumanosUsuariosInFuncionarios` ADD CONSTRAINT `RecursosHumanosUsuariosInFuncionarios_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecursosHumanosUsuariosInFuncionarios` ADD CONSTRAINT `RecursosHumanosUsuariosInFuncionarios_funcionarioId_fkey` FOREIGN KEY (`funcionarioId`) REFERENCES `RecursosHumanosFuncionarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecursosHumanosUsuariosInFuncionarios` ADD CONSTRAINT `RecursosHumanosUsuariosInFuncionarios_contaSistemaId_fkey` FOREIGN KEY (`contaSistemaId`) REFERENCES `ContasSistema`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmailConfigs` ADD CONSTRAINT `EmailConfigs_contaSistemaId_fkey` FOREIGN KEY (`contaSistemaId`) REFERENCES `ContasSistema`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TelegramConfigs` ADD CONSTRAINT `TelegramConfigs_contaSistemaId_fkey` FOREIGN KEY (`contaSistemaId`) REFERENCES `ContasSistema`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
