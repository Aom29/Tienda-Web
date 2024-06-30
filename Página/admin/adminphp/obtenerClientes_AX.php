<?php
    $filter = $_POST["filter"];
    $buscador = $_POST["buscador"];
    /*
    if($filter == "recent"){
        $sql = "SELECT id_cliente, Nombre, Apellido, Email FROM cliente ORDER BY id_cliente DESC";
    }
    else if($filter == "oldest"){
        $sql = "SELECT id_cliente, Nombre, Apellido, Email FROM cliente ORDER BY id_cliente ASC";
    }
    else if($filter == "a-z"){
        $sql = "SELECT id_cliente, Nombre, Apellido, Email FROM cliente ORDER BY Nombre ASC";
    }
    else if($filter == "z-a"){
        $sql = "SELECT id_cliente, Nombre, Apellido, Email FROM cliente ORDER BY Nombre DESC";
    }
    */
    // Hacer algo parecido pero con el valor del buscador también comparando con cada atributo de la consulta incluyendo que también se busque el id_cliente
    if($filter == "recent"){
        $sql = "SELECT id_cliente, Nombre, Apellido, Email FROM cliente WHERE id_cliente LIKE '%$buscador%' OR Nombre LIKE '%$buscador%' OR Apellido LIKE '%$buscador%' OR Email LIKE '%$buscador%' ORDER BY id_cliente DESC";
    }
    else if($filter == "oldest"){
        $sql = "SELECT id_cliente, Nombre, Apellido, Email FROM cliente WHERE id_cliente LIKE '%$buscador%' OR Nombre LIKE '%$buscador%' OR Apellido LIKE '%$buscador%' OR Email LIKE '%$buscador%' ORDER BY id_cliente ASC";
    }
    else if($filter == "a-z"){
        $sql = "SELECT id_cliente, Nombre, Apellido, Email FROM cliente WHERE id_cliente LIKE '%$buscador%' OR Nombre LIKE '%$buscador%' OR Apellido LIKE '%$buscador%' OR Email LIKE '%$buscador%' ORDER BY Nombre ASC";
    }
    else if($filter == "z-a"){
        $sql = "SELECT id_cliente, Nombre, Apellido, Email FROM cliente WHERE id_cliente LIKE '%$buscador%' OR Nombre LIKE '%$buscador%' OR Apellido LIKE '%$buscador%' OR Email LIKE '%$buscador%' ORDER BY Nombre DESC";
    }
        
    $conexion = mysqli_connect("localhost", "root", "", "grappe1");
    mysqli_query($conexion, "SET NAMES 'utf8'");
    $res = mysqli_query($conexion, $sql);
    $clientes = [];
    while($cliente = mysqli_fetch_assoc($res)){
        $clientes[] = $cliente;
    }
    $respAX = [
        "clientes" => $clientes
    ];

    echo json_encode($respAX);

?>