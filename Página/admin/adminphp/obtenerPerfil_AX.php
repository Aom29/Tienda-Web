<?php
    $emailLogin = $_POST["emailLogin"];

    // Datos: Nombre, Apellido, Email
    $conexion = mysqli_connect("localhost", "root", "", "grappe1");
    mysqli_query($conexion, "SET NAMES 'utf8'");
    $sql = "SELECT * FROM administrador WHERE Email = '$emailLogin'";
    $res = mysqli_query($conexion, $sql);
    $administrador = mysqli_fetch_assoc($res);

    $respAX = [
        "nombre" => $administrador["Nombre"],
        "apellido" => $administrador["Apellidos"],
        "email" => $administrador["Email"]
    ];

    echo json_encode($respAX);

?>