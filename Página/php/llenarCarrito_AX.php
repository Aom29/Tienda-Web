<?php
    $emailLogin = $_POST['emailLogin'];

    $conexion = mysqli_connect("localhost", "root", "", "grappe1");
    mysqli_query($conexion, "SET NAMES 'utf8'");
    // Consultar el id del cliente a partir del email
    $sql = "SELECT id_cliente FROM cliente WHERE Email = '$emailLogin'";
    $res = mysqli_query($conexion, $sql);
    $idCliente = mysqli_fetch_assoc($res)['id_cliente'];
    // Consultar los productos del carrito
    $sql = "SELECT  pc.cantidad, p.* FROM producto p
            INNER JOIN producto_carrito pc on p.id_producto = pc.producto_id_producto
            INNER JOIN cliente c on pc.cliente_id_cliente = c.id_cliente
            WHERE id_cliente = $idCliente";
    $res = mysqli_query($conexion, $sql);
    $productos = array();
    while($fila = mysqli_fetch_assoc($res)){
        $productos[] = $fila;
    }
    $respAX = [
        'productos' => $productos
    ];

    echo json_encode($respAX);




?>