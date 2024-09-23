-- AlterTable
ALTER TABLE `Categorias` MODIFY `contaSistemaId` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `Cliente` MODIFY `contaSistemaId` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `Contas` MODIFY `contaSistemaId` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `FormasPagamento` MODIFY `contaSistemaId` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `Parcelas` MODIFY `contaSistemaId` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `Transacao` MODIFY `contaSistemaId` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `Usuario` MODIFY `contaSistemaId` INTEGER NOT NULL DEFAULT 1;
