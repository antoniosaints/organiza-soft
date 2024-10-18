/*
  Warnings:

  - Added the required column `categoriaId` to the `PatrimonioProdutos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cor` to the `PatrimonioProdutos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `PatrimonioProdutos` ADD COLUMN `categoriaId` INTEGER NOT NULL,
    ADD COLUMN `cor` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `PatrimonioProdutoCategoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoria` VARCHAR(191) NOT NULL,
    `descricao` TEXT NOT NULL,
    `dataCriado` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dataAtualizado` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `produto_fornecedor_id` ON `PatrimonioComprasFornecedores`(`produtoId`, `fornecedorId`);

-- CreateIndex
CREATE INDEX `categoria_produto_key` ON `PatrimonioProdutos`(`categoriaId`);

-- AddForeignKey
ALTER TABLE `PatrimonioProdutos` ADD CONSTRAINT `PatrimonioProdutos_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `PatrimonioProdutoCategoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `PatrimonioProdutosEstoques` RENAME INDEX `PatrimonioProdutosEstoques_produtoId_armazenId_key` TO `produto_armazen_id`;
