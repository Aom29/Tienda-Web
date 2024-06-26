-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema grappe1
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema grappe1
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `grappe1` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;
USE `grappe1` ;

-- -----------------------------------------------------
-- Table `grappe1`.`administrador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `grappe1`.`administrador` (
  `id_adm` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(50) NOT NULL,
  `Apellidos` VARCHAR(50) NOT NULL,
  `Email` VARCHAR(100) NOT NULL,
  `Contraseña` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_adm`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `grappe1`.`categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `grappe1`.`categoria` (
  `id_categoria` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(100) NOT NULL,
  `Descripcion` TEXT NOT NULL,
  PRIMARY KEY (`id_categoria`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_bin;


-- -----------------------------------------------------
-- Table `grappe1`.`cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `grappe1`.`cliente` (
  `id_cliente` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(50) NOT NULL,
  `Apellido` VARCHAR(50) NOT NULL,
  `Email` VARCHAR(50) NOT NULL,
  `Contraseña` VARCHAR(255) NOT NULL,
  `Saldo` INT NOT NULL,
  `Numero Tarjeta` BIGINT NOT NULL,
  `Titular` VARCHAR(100) NOT NULL,
  `Año Vencimiento` INT NOT NULL,
  `Mes Vencimiento` INT NOT NULL,
  `CVV` INT NOT NULL,
  PRIMARY KEY (`id_cliente`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `grappe1`.`pedido`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `grappe1`.`pedido` (
  `id_pedido` INT NOT NULL AUTO_INCREMENT,
  `id_cliente` INT NOT NULL,
  `Calle` VARCHAR(100) NOT NULL,
  `Numero Exterior` INT NOT NULL,
  `Colonia` VARCHAR(100) NOT NULL,
  `Municipio` VARCHAR(100) NOT NULL,
  `Estado` VARCHAR(100) NOT NULL,
  `Codigo Postal` INT NOT NULL,
  `Pais` VARCHAR(50) NOT NULL,
  `Total` INT NOT NULL,
  `Fecha` DATE NOT NULL,
  PRIMARY KEY (`id_pedido`),
  INDEX `id_cliente` (`id_cliente` ASC),
  CONSTRAINT `pedido_ibfk_1`
    FOREIGN KEY (`id_cliente`)
    REFERENCES `grappe1`.`cliente` (`id_cliente`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `grappe1`.`producto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `grappe1`.`producto` (
  `id_producto` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(255) NOT NULL,
  `Precio` DECIMAL(15,2) NOT NULL,
  `Stock` INT NOT NULL,
  `id_categoria` INT NOT NULL,
  `Descuento` DECIMAL(10,2) NOT NULL,
  `Descripcion` TEXT NOT NULL,
  `Thumbnail` VARCHAR(255) NOT NULL,
  `Disponible` TINYINT NOT NULL,
  PRIMARY KEY (`id_producto`),
  INDEX `fk_producto_categoria1_idx` (`id_categoria` ASC),
  CONSTRAINT `fk_producto_categoria1`
    FOREIGN KEY (`id_categoria`)
    REFERENCES `grappe1`.`categoria` (`id_categoria`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `grappe1`.`review`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `grappe1`.`review` (
  `id_review` INT NOT NULL AUTO_INCREMENT,
  `id_cliente` INT NOT NULL,
  `id_producto` INT NOT NULL,
  `reseña` TEXT NOT NULL,
  `fecha_review` DATE NOT NULL,
  `rating` INT NOT NULL,
  PRIMARY KEY (`id_review`),
  INDEX `id_cliente` (`id_cliente` ASC),
  INDEX `id_producto` (`id_producto` ASC),
  CONSTRAINT `review_ibfk_1`
    FOREIGN KEY (`id_cliente`)
    REFERENCES `grappe1`.`cliente` (`id_cliente`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `review_ibfk_2`
    FOREIGN KEY (`id_producto`)
    REFERENCES `grappe1`.`producto` (`id_producto`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `grappe1`.`pedido_has_producto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `grappe1`.`pedido_has_producto` (
  `id_producto` INT NOT NULL,
  `id_pedido` INT NOT NULL,
  `cantidad` INT NOT NULL,
  INDEX `id_producto` (`id_producto` ASC, `id_pedido` ASC),
  INDEX `id_pedido` (`id_pedido` ASC),
  PRIMARY KEY (`id_producto`, `id_pedido`),
  CONSTRAINT `tiene_ibfk_1`
    FOREIGN KEY (`id_producto`)
    REFERENCES `grappe1`.`producto` (`id_producto`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `tiene_ibfk_2`
    FOREIGN KEY (`id_pedido`)
    REFERENCES `grappe1`.`pedido` (`id_pedido`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `grappe1`.`producto_carrito`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `grappe1`.`producto_carrito` (
  `cliente_id_cliente` INT NOT NULL,
  `producto_id_producto` INT NOT NULL,
  `cantidad` INT NOT NULL,
  PRIMARY KEY (`cliente_id_cliente`, `producto_id_producto`),
  INDEX `fk_cliente_has_producto_producto1_idx` (`producto_id_producto` ASC),
  INDEX `fk_cliente_has_producto_cliente1_idx` (`cliente_id_cliente` ASC),
  CONSTRAINT `fk_cliente_has_producto_cliente1`
    FOREIGN KEY (`cliente_id_cliente`)
    REFERENCES `grappe1`.`cliente` (`id_cliente`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_cliente_has_producto_producto1`
    FOREIGN KEY (`producto_id_producto`)
    REFERENCES `grappe1`.`producto` (`id_producto`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `grappe1`.`images`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `grappe1`.`images` (
  `producto_id_producto` INT NOT NULL,
  `link` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`producto_id_producto`, `link`),
  INDEX `fk_images_producto1_idx` (`producto_id_producto` ASC),
  CONSTRAINT `fk_images_producto1`
    FOREIGN KEY (`producto_id_producto`)
    REFERENCES `grappe1`.`producto` (`id_producto`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
