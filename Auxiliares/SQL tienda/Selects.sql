drop database grappe1;

use grappe1;
select * from categoria;
-- SELECTS CLIENTE

-- Para iniciar sesión (Se utiliza la variable correo)
select * from cliente where Email = 'laura.gonzalez@gmail.com';
-- Falta agregar que se verifique la contraseña, en con password_verify
-- En caso de ser un hash válido se puede iniciar sesión


-- Para registrarse (Se utiliza la variable correo)
select * from cliente where Email = 'david.perez@hotmail.com';
-- Si num_rows == 1 => El usuario ya existe
-- Si num_rows == 0 => Insertar el nuevo usuario

-- Para verificar sesión (Se utiliza la variable id_cliente)
select * from cliente where id_cliente = 201;
-- Como en privado_AX para poner en index.html y login.html
-- Validar con el js correspondiente si la sesión está activa


-- VER CARRITO (Poner el id_cliente como variable)
SELECT  pc.cantidad, p.* FROM producto p
INNER JOIN producto_carrito pc on p.id_producto = pc.producto_id_producto
INNER JOIN cliente c on pc.cliente_id_cliente = c.id_cliente
WHERE id_cliente = 1;

-- AGREGAR AL CARRITO (Recibe id_cliente, id_producto, cantidad)
-- El id_cliente lo puede tomar del emailLogin, el idproducto del elemento seleccionado, la cantidad del html
	SELECT id_cliente FROM cliente WHERE Email = "carlos.lopez@gmail.com";
-- Si no existe, hacer un insert
INSERT INTO producto_carrito (`cliente_id_cliente`, `producto_id_producto`, `cantidad`) VALUES 
(1, 1, 1);

-- Si existe poner un update
UPDATE producto_carrito
SET cantidad = 2
WHERE cliente_id_cliente = 1 AND producto_id_producto = 1;

INSERT INTO producto_carrito (`cliente_id_cliente`, `producto_id_producto`, `cantidad`) VALUES 
(1, 4, 1);

-- Eliminar un producto
DELETE FROM producto_carrito WHERE cliente_id_cliente = 1 AND producto_id_producto = 1;

select * from producto_carrito;

-- CARRITO TOTAL (id_cliente variable)
SELECT SUM(cantidad*(Precio*((100-Descuento)/100))) FROM producto p
INNER JOIN producto_carrito pc on p.id_producto = pc.producto_id_producto
INNER JOIN cliente c on pc.cliente_id_cliente = c.id_cliente
WHERE id_cliente = 1;

-- PEDIDO
-- Obtener datos del cliente ($datosCliente) fetch
SELECT * FROM cliente WHERE Email = "carlos.lopez@gmail.com";

-- Calcular total ($total)
SELECT SUM(cantidad*(Precio*((100-Descuento)/100))) FROM producto p
INNER JOIN producto_carrito pc on p.id_producto = pc.producto_id_producto
INNER JOIN cliente c on pc.cliente_id_cliente = c.id_cliente
WHERE id_cliente = 1;

-- Verificar si el saldo disponible es suficiente ($saldo-$total >= 0)
-- Éxito => Saldo = $nuevoSaldo = $saldo-$total
UPDATE cliente
SET Saldo = 6000
WHERE id_cliente = 1;

select * from cliente where id_cliente = 1;

-- Crear el pedido, $total
INSERT INTO pedido(id_cliente, Calle, `Numero Exterior`, Colonia, Municipio, Estado, `Codigo Postal`, Pais, Total, Fecha) VALUES
(1, "Santa Rosa", 4, "San Martín", "Atlacomulco", "México", "50454", "México", 4000, '2024-06-26');
select * from pedido;
-- Guardar el id_pedido ($idPedido)
SELECT max(id_pedido) as "id_pedido" FROM pedido;

-- Leer los productos de carrito $Carrito (fetch (leer e insertar uno por uno))
SELECT * FROM producto_carrito
WHERE cliente_id_cliente = 1;

-- Inserción de valores uno por uno ($producto[id_pedido], etc)
-- ****************** BORRAR ATRIBUTO PRODUCTO) *********************
INSERT INTO pedido_has_producto(id_producto, id_pedido, cantidad) VALUES
(1, 1, 2);
INSERT INTO pedido_has_producto(id_producto, id_pedido, cantidad) VALUES
(4, 1, 1);
select * from pedido_has_producto;
-- delete from pedido_has_producto where id_pedido = 1;

-- Borrar todos los productos del carrito
DELETE FROM producto_carrito WHERE cliente_id_cliente = 1;

-- Ver pedidos de un cliente ($id_cliente)
SELECT id_pedido, fecha FROM pedido WHERE id_cliente = 1;
-- Seleccionar productos del $id_pedido de un cliente
SELECT pp.cantidad, p.* FROM producto p
INNER JOIN pedido_has_producto pp on pp.id_producto = p.id_producto
INNER JOIN pedido pe on pe.id_pedido = pp.id_pedido
INNER JOIN cliente c on c.id_cliente = pe.id_cliente
WHERE c.id_cliente = 1;