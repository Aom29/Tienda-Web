<?php

    $conexion = mysqli_connect("localhost", "root", "", "grappe1");
    mysqli_query($conexion, "SET NAMES 'utf8'");
    // Hacer las consultas correspondientes
    $sql = "SELECT count(*) from cliente";
    $res = mysqli_query($conexion, $sql);
    $usuarios = mysqli_fetch_row($res)[0];
    $sql = "SELECT count(*) from pedido_has_producto";
    $res = mysqli_query($conexion, $sql);
    $ventas = mysqli_fetch_row($res)[0];
    $sql = "SELECT count(*) from review";
    $res = mysqli_query($conexion, $sql);
    $comentarios = mysqli_fetch_row($res)[0];
    // Suma de los totales de la tabla pedido
    $sql = "SELECT sum(total) from pedido";
    $res = mysqli_query($conexion, $sql);
    $ganado = mysqli_fetch_row($res)[0];
    $ganado = number_format($ganado, 2, '.', '');
    $respAX = [
        "usuarios" => $usuarios,
        "ventas" => $ventas,
        "comentarios" => $comentarios,
        "ganado" => $ganado
    ];

    echo json_encode($respAX);

?>