<?php

    $conexion = mysqli_connect("localhost", "root", "", "grappe1");
    mysqli_query($conexion, "SET NAMES 'utf8'");
    // Consultar los productos del carrito
    $sql = "SELECT * FROM producto";
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