<?php
    $emailLogin = $_POST['emailLogin'];

    $conexion = mysqli_connect("localhost", "root", "", "grappe1");
    mysqli_query($conexion, "SET NAMES 'utf8'");
    // Consultar el id del cliente a partir del email
    $sql = "SELECT id_cliente FROM cliente WHERE Email = '$emailLogin'";
    $res = mysqli_query($conexion, $sql);
    $idCliente = mysqli_fetch_assoc($res)['id_cliente'];
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