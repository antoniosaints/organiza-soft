/*
  Warnings:

  - You are about to alter the column `pdv` on the `PatrimonioProdutosEstoques` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(11))` to `TinyInt`.
  - Added the required column `varianteId` to the `PatrimonioComprasFornecedores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `varianteId` to the `PatrimonioProdutosEstoques` table without a default value. This is not possible if the table is not empty.
  - Added the required column `varianteId` to the `PatrimonioProdutosMovimentos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `PatrimonioArmazenamentos` ADD COLUMN `descricao` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `PatrimonioComprasFornecedores` ADD COLUMN `descricao` VARCHAR(191) NULL,
    ADD COLUMN `valor` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `varianteId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `PatrimonioProdutosEstoques` ADD COLUMN `controle` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `descricao` VARCHAR(191) NULL,
    ADD COLUMN `varianteId` INTEGER NOT NULL,
    MODIFY `pdv` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `PatrimonioProdutosMovimentos` ADD COLUMN `varianteId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `PatrimonioVariantesProduto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `produtoId` INTEGER NOT NULL,
    `contaSistemaId` INTEGER NOT NULL,
    `cor` VARCHAR(191) NULL,
    `modelo` VARCHAR(191) NULL,
    `material` VARCHAR(191) NULL,
    `peso` DOUBLE NULL,
    `fabricante` VARCHAR(191) NULL,
    `altura` DOUBLE NULL,
    `largura` DOUBLE NULL,
    `etiquetaENCE` VARCHAR(191) NULL,
    `alimentacao` VARCHAR(191) NULL,
    `pilhaOuBateria` BOOLEAN NOT NULL DEFAULT false,
    `codigoBarra` VARCHAR(191) NULL,
    `descricao` VARCHAR(191) NULL,
    `dataCriado` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `datAtualizado` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `PatrimonioProdutosMovimentos_varianteId_idx` ON `PatrimonioProdutosMovimentos`(`varianteId`);

-- AddForeignKey
ALTER TABLE `PatrimonioVariantesProduto` ADD CONSTRAINT `PatrimonioVariantesProduto_produtoId_fkey` FOREIGN KEY (`produtoId`) REFERENCES `PatrimonioProdutos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PatrimonioVariantesProduto` ADD CONSTRAINT `PatrimonioVariantesProduto_contaSistemaId_fkey` FOREIGN KEY (`contaSistemaId`) REFERENCES `ContasSistema`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PatrimonioProdutosEstoques` ADD CONSTRAINT `PatrimonioProdutosEstoques_varianteId_fkey` FOREIGN KEY (`varianteId`) REFERENCES `PatrimonioVariantesProduto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PatrimonioProdutosMovimentos` ADD CONSTRAINT `PatrimonioProdutosMovimentos_varianteId_fkey` FOREIGN KEY (`varianteId`) REFERENCES `PatrimonioVariantesProduto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PatrimonioComprasFornecedores` ADD CONSTRAINT `PatrimonioComprasFornecedores_varianteId_fkey` FOREIGN KEY (`varianteId`) REFERENCES `PatrimonioVariantesProduto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
