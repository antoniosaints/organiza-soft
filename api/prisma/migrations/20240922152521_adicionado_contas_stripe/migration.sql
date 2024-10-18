-- CreateTable
CREATE TABLE `ContasSistema` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_create_id` INTEGER NOT NULL,
    `conta` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NULL,
    `descricao` TEXT NULL,
    `status` ENUM('ativa', 'inativa') NOT NULL,
    `stripeCustomerId` VARCHAR(191) NOT NULL,
    `stripeSubscriptionId` VARCHAR(191) NULL,
    `dataCriado` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dataAtualizada` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ContasSistema` ADD CONSTRAINT `ContasSistema_user_create_id_fkey` FOREIGN KEY (`user_create_id`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
