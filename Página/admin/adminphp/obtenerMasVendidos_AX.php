<?php

    $conexion = mysqli_connect("localhost", "root", "", "grappe1");
    mysqli_query($conexion, "SET NAMES 'utf8'");
    // Consultar los mas vendidos
    $sql = "SELECT sum(pp.cantidad) as cantidad, p.* FROM producto p
            INNER JOIN pedido_has_producto pp on pp.id_producto = p.id_producto
            INNER JOIN pedido pe on pe.id_pedido = pp.id_pedido
            GROUP BY p.id_producto
            ORDER BY sum(pp.cantidad) DESC
            LIMIT 5;";
    $res = mysqli_query($conexion, $sql);
    $cantidades = array();
    $productos = array();
    while($reg = mysqli_fetch_array($res)){
        $cantidades[] = $reg['cantidad'];
        $productos[] = $reg['Nombre'];
    }
    $respAX = [
        'cantidades' => $cantidades,
        'productos' => $productos
    ];

    echo json_encode($respAX);

?>