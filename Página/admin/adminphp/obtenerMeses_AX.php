<?php

    // Mapear los meses con su numero y mes respectivo
    $mesString = array(
        1 => 'Enero',
        2 => 'Febrero',
        3 => 'Marzo',
        4 => 'Abril',
        5 => 'Mayo',
        6 => 'Junio',
        7 => 'Julio',
        8 => 'Agosto',
        9 => 'Septiembre',
        10 => 'Octubre',
        11 => 'Noviembre',
        12 => 'Diciembre'
    );

    $conexion = mysqli_connect("localhost", "root", "", "grappe1");
    mysqli_query($conexion, "SET NAMES 'utf8'");
    // Consultar los mas vendidos por mes
    $sql = "SELECT sum(pp.cantidad) as cantidad, MONTH(pe.fecha) as meses FROM producto p
            INNER JOIN pedido_has_producto pp on pp.id_producto = p.id_producto
            INNER JOIN pedido pe on pe.id_pedido = pp.id_pedido
            GROUP BY MONTH(pe.fecha)
            ORDER BY sum(pp.cantidad) DESC
            LIMIT 5;";
    $res = mysqli_query($conexion, $sql);
    $cantidades = array();
    $meses = array();
    while($reg = mysqli_fetch_array($res)){
        $cantidades[] = $reg['cantidad'];
        $meses[] = $mesString[$reg['meses']];
    }
    $respAX = [
        'cantidades' => $cantidades,
        'meses' => $meses
    ];

    echo json_encode($respAX);

?>