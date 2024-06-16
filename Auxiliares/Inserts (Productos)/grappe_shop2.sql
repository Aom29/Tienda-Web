-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-06-2024 a las 04:41:37
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `grappe shop`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administrador`
--

CREATE TABLE `administrador` (
  `id_adm` int(11) NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `Apellidos` varchar(50) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Contraseña` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `administrador`
--

INSERT INTO `administrador` (`id_adm`, `Nombre`, `Apellidos`, `Email`, `Contraseña`) VALUES
(41, 'Juan', 'Perez', 'juanperez@gmail.com', 'abc123'),
(42, 'María', 'Gómez', 'mariagomez@hotmail.com', 'def456'),
(43, 'Pedro', 'López', 'pedrolopez@gmail.com', 'ghi789'),
(44, 'Laura', 'Martínez', 'lauramartinez@hotmail.com', 'jkl012'),
(45, 'Carlos', 'González', 'carlosgonzalez@gmail.com', 'mno345'),
(46, 'Ana', 'Rodríguez', 'anarodriguez@hotmail.com', 'pqr678'),
(47, 'José', 'Hernández', 'josehernandez@gmail.com', 'stu901'),
(48, 'Sofía', 'Díaz', 'sofiadiaz@hotmail.com', 'vwx234'),
(49, 'Jorge', 'Pérez', 'jorgeperez@gmail.com', 'yza567'),
(50, 'Lucía', 'Gómez', 'luciagomez@hotmail.com', 'bcd890'),
(51, 'Marcela', 'López', 'marcelalopez@gmail.com', 'efg123'),
(52, 'Daniel', 'Martínez', 'danielmartinez@hotmail.com', 'hij456'),
(53, 'Fernanda', 'González', 'fernandagonzalez@gmail.com', 'klm789'),
(54, 'Diego', 'Rodríguez', 'diegorodriguez@hotmail.com', 'nop012'),
(55, 'Valeria', 'Hernández', 'valeriahernandez@gmail.com', 'qrs345'),
(56, 'Martín', 'Díaz', 'martindiaz@hotmail.com', 'tuv678'),
(57, 'Alejandra', 'Pérez', 'alejandraperez@gmail.com', 'wxy901'),
(58, 'Andrés', 'Gómez', 'andresgomez@hotmail.com', 'zab234'),
(59, 'Mariana', 'López', 'marianalopez@gmail.com', 'cde567'),
(60, 'Eduardo', 'Martínez', 'eduardomartinez@hotmail.com', 'fgh890'),
(61, 'Camila', 'González', 'camilagonzalez@gmail.com', 'ijk123'),
(62, 'Raúl', 'Rodríguez', 'raulrodriguez@hotmail.com', 'lmn456'),
(63, 'María José', 'Hernández', 'mariajosehernandez@gmail.com', 'opq789'),
(64, 'Luis', 'Díaz', 'luisdiaz@hotmail.com', 'rst012'),
(65, 'Ana Sofía', 'Pérez', 'anasofiaperez@gmail.com', 'uvw345'),
(66, 'Pablo', 'Gómez', 'pablogomez@hotmail.com', 'xyz678'),
(67, 'Gabriela', 'López', 'gabrielalopez@gmail.com', '123abc'),
(68, 'Santiago', 'Martínez', 'santiagomartinez@hotmail.com', '456def'),
(69, 'Daniela', 'González', 'danielagonzalez@gmail.com', '789ghi'),
(70, 'Javier', 'Rodríguez', 'javierrodriguez@hotmail.com', 'jklmno'),
(71, 'Valentina', 'Hernández', 'valentinahernandez@gmail.com', 'pqrstu'),
(72, 'Felipe', 'Díaz', 'felipediaz@hotmail.com', 'vwxyz1'),
(73, 'Paula', 'Pérez', 'paulaperez@gmail.com', '234abc'),
(74, 'Diego', 'Gómez', 'diegogomez@hotmail.com', '567def'),
(75, 'María Fernanda', 'López', 'mariafernandalopez@gmail.com', '890ghi'),
(76, 'Mateo', 'Martínez', 'mateomartinez@hotmail.com', 'jklmno1'),
(77, 'Regina', 'González', 'reginagonzalez@gmail.com', 'pqrstu2'),
(78, 'Sebastián', 'Rodríguez', 'sebastianrodriguez@hotmail.com', 'vwxyz34'),
(79, 'Juliana', 'Hernández', 'julianahernandez@gmail.com', '567abc'),
(80, 'Martina', 'Díaz', 'martinadiaz@hotmail.com', 'defghi');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `agrega`
--

CREATE TABLE `agrega` (
  `id_producto` int(11) NOT NULL,
  `id_adm` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito`
--

CREATE TABLE `carrito` (
  `id_carrito` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `Total` int(11) NOT NULL,
  `Cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id_categoria` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Descripcion` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `id_cliente` int(100) NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `Apellido` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Contraseña` varchar(8) NOT NULL,
  `Saldo` int(100) NOT NULL,
  `Numero Tarjeta` bigint(100) NOT NULL,
  `Titular` varchar(100) NOT NULL,
  `Año Vencimiento` int(4) NOT NULL,
  `Mes Vencimiento` int(2) NOT NULL,
  `CVV` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`id_cliente`, `Nombre`, `Apellido`, `Email`, `Contraseña`, `Saldo`, `Numero Tarjeta`, `Titular`, `Año Vencimiento`, `Mes Vencimiento`, `CVV`) VALUES
(194, 'Carlos', 'Lopez', 'carlos.lopez@gmail.com', 'abc123', 10000, 1234567812345678, 'Carlos Lopez', 2025, 12, 123),
(195, 'Ana', 'Martinez', 'ana.martinez@hotmail.com', 'def456', 10000, 2345678923456789, 'Ana Martinez', 2024, 11, 456),
(196, 'Luis', 'Garcia', 'luis.garcia@gmail.com', 'ghi789', 10000, 3456789034567890, 'Luis Garcia', 2026, 10, 789),
(197, 'Maria', 'Hernandez', 'maria.hernandez@hotmail.com', 'jkl012', 10000, 4567890145678901, 'Maria Hernandez', 2023, 9, 12),
(198, 'Pedro', 'Fernandez', 'pedro.fernandez@gmail.com', 'mno345', 10000, 5678901256789012, 'Pedro Fernandez', 2027, 8, 345),
(199, 'Laura', 'Gonzalez', 'laura.gonzalez@gmail.com', 'pqr678', 10000, 6789012367890123, 'Laura Gonzalez', 2023, 7, 678),
(200, 'David', 'Perez', 'david.perez@hotmail.com', 'stu901', 10000, 7890123478901234, 'David Perez', 2024, 6, 901),
(201, 'Jose', 'Sanchez', 'jose.sanchez@gmail.com', 'vwx234', 10000, 8901234589012345, 'Jose Sanchez', 2025, 5, 234),
(202, 'Sandra', 'Ramirez', 'sandra.ramirez@hotmail.com', 'yza567', 10000, 9012345690123456, 'Sandra Ramirez', 2026, 4, 567),
(203, 'Jorge', 'Torres', 'jorge.torres@gmail.com', 'bcd890', 10000, 123456701234567, 'Jorge Torres', 2027, 3, 890),
(204, 'Lucia', 'Diaz', 'lucia.diaz@hotmail.com', 'efg123', 10000, 1234567812345678, 'Lucia Diaz', 2023, 2, 123),
(205, 'Alberto', 'Ruiz', 'alberto.ruiz@gmail.com', 'hij456', 10000, 2345678923456789, 'Alberto Ruiz', 2024, 1, 456),
(206, 'Pablo', 'Morales', 'pablo.morales@hotmail.com', 'klm789', 10000, 3456789034567890, 'Pablo Morales', 2025, 12, 789),
(207, 'Monica', 'Ortiz', 'monica.ortiz@gmail.com', 'nop012', 10000, 4567890145678901, 'Monica Ortiz', 2026, 11, 12),
(208, 'Raul', 'Gutierrez', 'raul.gutierrez@hotmail.com', 'qrs345', 10000, 5678901256789012, 'Raul Gutierrez', 2027, 10, 345),
(209, 'Claudia', 'Ramos', 'claudia.ramos@gmail.com', 'tuv678', 10000, 6789012367890123, 'Claudia Ramos', 2023, 9, 678),
(210, 'Francisco', 'Reyes', 'francisco.reyes@hotmail.com', 'wxy901', 10000, 7890123478901234, 'Francisco Reyes', 2024, 8, 901),
(211, 'Patricia', 'Cruz', 'patricia.cruz@gmail.com', 'abc234', 10000, 8901234589012345, 'Patricia Cruz', 2025, 7, 234),
(212, 'Juan', 'Vargas', 'juan.vargas@hotmail.com', 'def567', 10000, 9012345690123456, 'Juan Vargas', 2026, 6, 567),
(213, 'Alejandra', 'Castillo', 'alejandra.castillo@gmail.com', 'ghi890', 10000, 123456701234567, 'Alejandra Castillo', 2027, 5, 890),
(214, 'Martin', 'Mendoza', 'martin.mendoza@hotmail.com', 'jkl123', 10000, 1234567812345678, 'Martin Mendoza', 2023, 4, 123),
(215, 'Teresa', 'Silva', 'teresa.silva@gmail.com', 'mno456', 10000, 2345678923456789, 'Teresa Silva', 2024, 3, 456),
(216, 'Manuel', 'Ortega', 'manuel.ortega@hotmail.com', 'pqr789', 10000, 3456789034567890, 'Manuel Ortega', 2025, 2, 789),
(217, 'Elena', 'Delgado', 'elena.delgado@gmail.com', 'stu012', 10000, 4567890145678901, 'Elena Delgado', 2026, 1, 12),
(218, 'Rafael', 'Navarro', 'rafael.navarro@hotmail.com', 'vwx345', 10000, 5678901256789012, 'Rafael Navarro', 2027, 12, 345),
(219, 'Gabriela', 'Rojas', 'gabriela.rojas@gmail.com', 'yza678', 10000, 6789012367890123, 'Gabriela Rojas', 2023, 11, 678),
(220, 'Miguel', 'Estrada', 'miguel.estrada@hotmail.com', 'bcd901', 10000, 7890123478901234, 'Miguel Estrada', 2024, 10, 901),
(221, 'Carmen', 'Guerrero', 'carmen.guerrero@gmail.com', 'efg234', 10000, 8901234589012345, 'Carmen Guerrero', 2025, 9, 234),
(222, 'Gustavo', 'Rios', 'gustavo.rios@hotmail.com', 'hij567', 10000, 9012345690123456, 'Gustavo Rios', 2026, 8, 567),
(223, 'Rosa', 'Romero', 'rosa.romero@gmail.com', 'klm890', 10000, 123456701234567, 'Rosa Romero', 2027, 7, 890),
(224, 'Fernando', 'Vega', 'fernando.vega@hotmail.com', 'nop123', 10000, 1234567812345678, 'Fernando Vega', 2023, 6, 123),
(225, 'Isabel', 'Herrera', 'isabel.herrera@gmail.com', 'qrs456', 10000, 2345678923456789, 'Isabel Herrera', 2024, 5, 456),
(226, 'Roberto', 'Lara', 'roberto.lara@hotmail.com', 'tuv789', 10000, 3456789034567890, 'Roberto Lara', 2025, 4, 789),
(227, 'Daniela', 'Iglesias', 'daniela.iglesias@gmail.com', 'wxy012', 10000, 4567890145678901, 'Daniela Iglesias', 2026, 3, 12),
(228, 'Andres', 'Carrillo', 'andres.carrillo@hotmail.com', 'abc345', 10000, 5678901256789012, 'Andres Carrillo', 2027, 2, 345),
(229, 'Gloria', 'Rico', 'gloria.rico@gmail.com', 'def678', 10000, 6789012367890123, 'Gloria Rico', 2023, 1, 678),
(230, 'Eduardo', 'Pena', 'eduardo.pena@hotmail.com', 'ghi901', 10000, 7890123478901234, 'Eduardo Pena', 2024, 12, 901),
(231, 'Veronica', 'Reyes', 'veronica.reyes@gmail.com', 'jkl234', 10000, 8901234589012345, 'Veronica Reyes', 2025, 11, 234);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contiene`
--

CREATE TABLE `contiene` (
  `id_producto` int(11) NOT NULL,
  `id_carrito` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `id_pedido` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `id_carrito` int(11) NOT NULL,
  `Calle` varchar(100) NOT NULL,
  `Numero Exterior` int(11) NOT NULL,
  `Colonia` varchar(100) NOT NULL,
  `Municipio` varchar(100) NOT NULL,
  `Estado` varchar(100) NOT NULL,
  `Codigo Postal` int(5) NOT NULL,
  `Pais` varchar(50) NOT NULL,
  `Total` int(11) NOT NULL,
  `Fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pertenece`
--

CREATE TABLE `pertenece` (
  `id_producto` int(11) NOT NULL,
  `id_categoria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id_producto` int(11) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Precio` decimal(15,0) NOT NULL,
  `Stock` int(11) NOT NULL,
  `id_categoria` int(11) NOT NULL,
  `id_review` int(11) NOT NULL,
  `Descuento` decimal(10,0) NOT NULL,
  `Descripcion` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `review`
--

CREATE TABLE `review` (
  `id_review` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `reseña` text NOT NULL,
  `fecha_review` date NOT NULL,
  `rating` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tiene`
--

CREATE TABLE `tiene` (
  `cantidad` int(11) NOT NULL,
  `producto` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `id_pedido` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD PRIMARY KEY (`id_adm`);

--
-- Indices de la tabla `agrega`
--
ALTER TABLE `agrega`
  ADD KEY `id_producto` (`id_producto`,`id_adm`),
  ADD KEY `id_adm` (`id_adm`);

--
-- Indices de la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD PRIMARY KEY (`id_carrito`),
  ADD KEY `id_cliente` (`id_cliente`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id_cliente`);

--
-- Indices de la tabla `contiene`
--
ALTER TABLE `contiene`
  ADD KEY `id_producto` (`id_producto`,`id_carrito`),
  ADD KEY `id_carrito` (`id_carrito`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`id_pedido`),
  ADD KEY `id_cliente` (`id_cliente`),
  ADD KEY `id_carrito` (`id_carrito`);

--
-- Indices de la tabla `pertenece`
--
ALTER TABLE `pertenece`
  ADD KEY `id_producto` (`id_producto`,`id_categoria`),
  ADD KEY `id_categoria` (`id_categoria`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id_producto`),
  ADD KEY `id_categoria` (`id_categoria`),
  ADD KEY `id_review` (`id_review`);

--
-- Indices de la tabla `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`id_review`),
  ADD KEY `id_cliente` (`id_cliente`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `tiene`
--
ALTER TABLE `tiene`
  ADD KEY `id_producto` (`id_producto`,`id_pedido`),
  ADD KEY `id_pedido` (`id_pedido`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administrador`
--
ALTER TABLE `administrador`
  MODIFY `id_adm` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT de la tabla `carrito`
--
ALTER TABLE `carrito`
  MODIFY `id_carrito` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id_cliente` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=232;

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `review`
--
ALTER TABLE `review`
  MODIFY `id_review` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `agrega`
--
ALTER TABLE `agrega`
  ADD CONSTRAINT `agrega_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`),
  ADD CONSTRAINT `agrega_ibfk_2` FOREIGN KEY (`id_adm`) REFERENCES `administrador` (`id_adm`);

--
-- Filtros para la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD CONSTRAINT `carrito_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`),
  ADD CONSTRAINT `carrito_ibfk_3` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`);

--
-- Filtros para la tabla `contiene`
--
ALTER TABLE `contiene`
  ADD CONSTRAINT `contiene_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`),
  ADD CONSTRAINT `contiene_ibfk_2` FOREIGN KEY (`id_carrito`) REFERENCES `carrito` (`id_carrito`);

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`),
  ADD CONSTRAINT `pedido_ibfk_2` FOREIGN KEY (`id_carrito`) REFERENCES `carrito` (`id_carrito`);

--
-- Filtros para la tabla `pertenece`
--
ALTER TABLE `pertenece`
  ADD CONSTRAINT `pertenece_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`),
  ADD CONSTRAINT `pertenece_ibfk_2` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`);

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`id_review`) REFERENCES `review` (`id_review`);

--
-- Filtros para la tabla `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `review_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`),
  ADD CONSTRAINT `review_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`);

--
-- Filtros para la tabla `tiene`
--
ALTER TABLE `tiene`
  ADD CONSTRAINT `tiene_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`),
  ADD CONSTRAINT `tiene_ibfk_2` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id_pedido`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
