<?php

    $conexion = mysqli_connect("localhost", "root", "", "grappe1");
    mysqli_query($conexion, "SET NAMES 'utf8'");
    // Consultar las mas vendidas
    $sql = "SELECT sum(pp.cantidad) as cantidad, c.* FROM categoria c
            INNER JOIN producto p on p.id_categoria = c.id_categoria
            INNER JOIN pedido_has_producto pp on pp.id_producto = p.id_producto
            INNER JOIN pedido pe on pe.id_pedido = pp.id_pedido
            GROUP BY c.id_categoria
            ORDER BY sum(pp.cantidad) DESC
            LIMIT 5;";
    $res = mysqli_query($conexion, $sql);
    $cantidades = array();
    $categorias = array();
    while($reg = mysqli_fetch_array($res)){
        $cantidades[] = $reg['cantidad'];
        $categorias[] = $reg['Nombre'];
    }
    $respAX = [
        'cantidades' => $cantidades,
        'categorias' => $categorias
    ];

    echo json_encode($respAX);

?>