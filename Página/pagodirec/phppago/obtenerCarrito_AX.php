<?php
    $emailLogin = $_POST['emailLogin'];

    $conexion = mysqli_connect("localhost", "root", "", "grappe1");
    mysqli_query($conexion, "SET NAMES 'utf8'");
    // Consultar el id del cliente a partir del email
    $sql = "SELECT * FROM cliente WHERE Email = '$emailLogin'";
    $res = mysqli_query($conexion, $sql);
    // Guardar el $idCliente, $saldo
    $row = mysqli_fetch_assoc($res);
    $idCliente = $row['id_cliente'];
    $saldo = $row['Saldo'];
    // Obtener los productos del carrito
    $sql = "SELECT p.*, pc.cantidad FROM producto p
            INNER JOIN producto_carrito pc on p.id_producto = pc.producto_id_producto
            INNER JOIN cliente c on pc.cliente_id_cliente = c.id_cliente
            WHERE id_cliente = $idCliente";
    $res = mysqli_query($conexion, $sql);
    $productos = [];
    $total = 0;
    while($fila = mysqli_fetch_assoc($res)){
        $idProducto = $fila['id_producto'];
        $nombre = $fila['Nombre'];
        $imagen = $fila['Thumbnail'];
        $cantidad = $fila['cantidad'];
        $precio = $fila['Precio'];
        $descuento = $fila['Descuento'];
        $total += $cantidad * $precio * ((100 - $descuento) / 100);
        $productos[] = [
            "idProducto" => $idProducto,
            "nombre" => $nombre,
            "imagen" => $imagen,
            "cantidad" => $cantidad,
            "precio" => $precio,
            "descuento" => $descuento
        ];
    }

    // Obtener el total del descuento de los carritos del producto
    $sql = "SELECT SUM(cantidad*(Precio*(Descuento)/100)) as total FROM producto p
            INNER JOIN producto_carrito pc on p.id_producto = pc.producto_id_producto
            INNER JOIN cliente c on pc.cliente_id_cliente = c.id_cliente
            WHERE id_cliente = $idCliente";
    $res = mysqli_query($conexion, $sql);
    $totalDescuento = mysqli_fetch_assoc($res)['total'];

    // Calcular el total final
    $totalFinal = $total - $totalDescuento;

    // RespAX con los productos, total, totalDescuento y totalFinal con dos decimales
    $respAX = [
        "productos" => $productos,
        "total" => number_format($total, 2),
        "totalDescuento" => number_format($totalDescuento, 2),
        "totalFinal" => number_format($totalFinal, 2),
        "saldo" => $saldo,
        "cod" => 1
    ];
    
    echo json_encode($respAX);
    ?>