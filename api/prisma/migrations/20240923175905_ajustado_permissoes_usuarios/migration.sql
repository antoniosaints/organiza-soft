-- AlterTable
ALTER TABLE `Usuario` MODIFY `regra` ENUM('proprietario', 'socio', 'admin', 'gerente', 'moderador', 'submoderador', 'visualizador') NOT NULL;
