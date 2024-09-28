-- AlterTable
ALTER TABLE `Cliente` ALTER COLUMN `contaSistemaId` DROP DEFAULT;

-- AlterTable
ALTER TABLE `FianceiroFormasPagamento` ALTER COLUMN `contaSistemaId` DROP DEFAULT;

-- AlterTable
ALTER TABLE `FinanceiroCategorias` ALTER COLUMN `contaSistemaId` DROP DEFAULT;

-- AlterTable
ALTER TABLE `FinanceiroContas` ALTER COLUMN `contaSistemaId` DROP DEFAULT;

-- AlterTable
ALTER TABLE `FinanceiroParcelas` ALTER COLUMN `contaSistemaId` DROP DEFAULT;

-- AlterTable
ALTER TABLE `FinanceiroTransacao` ALTER COLUMN `contaSistemaId` DROP DEFAULT;

-- AlterTable
ALTER TABLE `Usuario` ALTER COLUMN `contaSistemaId` DROP DEFAULT;
