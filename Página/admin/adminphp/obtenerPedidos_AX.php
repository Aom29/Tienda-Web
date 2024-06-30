<?php
    $filter = $_POST["filter"];
    $buscador = $_POST["buscador"];
    // Hacer algo parecido pero con el valor del buscador también comparando con cada atributo de la consulta incluyendo que también se busque el id_cliente
    if($filter == "recent"){
        $sql = "SELECT pe.id_pedido as 'id_pedido', c.Nombre as 'Nombre', c.Apellido as 'Apellido', pe.Municipio as 'Direccion', pe.Fecha as 'Fecha', pe.Total as 'Total'
        FROM cliente c INNER JOIN pedido pe ON c.id_cliente = pe.id_cliente WHERE pe.id_pedido LIKE '%$buscador%' OR c.Nombre LIKE '%$buscador%' OR c.Apellido LIKE '%$buscador%' OR pe.Municipio LIKE '%$buscador%' OR pe.Fecha LIKE '%$buscador%' OR pe.Total LIKE '%$buscador%' ORDER BY pe.id_pedido DESC";
    }
    else if($filter == "oldest"){
        $sql = "SELECT pe.id_pedido as 'id_pedido', c.Nombre as 'Nombre', c.Apellido as 'Apellido', pe.Municipio as 'Direccion', pe.Fecha as 'Fecha', pe.Total as 'Total'
        FROM cliente c INNER JOIN pedido pe ON c.id_cliente = pe.id_cliente WHERE pe.id_pedido LIKE '%$buscador%' OR c.Nombre LIKE '%$buscador%' OR c.Apellido LIKE '%$buscador%' OR pe.Municipio LIKE '%$buscador%' OR pe.Fecha LIKE '%$buscador%' OR pe.Total LIKE '%$buscador%' ORDER BY pe.id_pedido ASC";
    }
    else if($filter == "mayor-precio"){
        $sql = "SELECT pe.id_pedido as 'id_pedido', c.Nombre as 'Nombre', c.Apellido as 'Apellido', pe.Municipio as 'Direccion', pe.Fecha as 'Fecha', pe.Total as 'Total'
        FROM cliente c INNER JOIN pedido pe ON c.id_cliente = pe.id_cliente WHERE pe.id_pedido LIKE '%$buscador%' OR c.Nombre LIKE '%$buscador%' OR c.Apellido LIKE '%$buscador%' OR pe.Municipio LIKE '%$buscador%' OR pe.Fecha LIKE '%$buscador%' OR pe.Total LIKE '%$buscador%' ORDER BY pe.Total DESC";
    }
    else if($filter == "menor-precio"){
        $sql = "SELECT pe.id_pedido as 'id_pedido', c.Nombre as 'Nombre', c.Apellido as 'Apellido', pe.Municipio as 'Direccion', pe.Fecha as 'Fecha', pe.Total as 'Total'
        FROM cliente c INNER JOIN pedido pe ON c.id_cliente = pe.id_cliente WHERE pe.id_pedido LIKE '%$buscador%' OR c.Nombre LIKE '%$buscador%' OR c.Apellido LIKE '%$buscador%' OR pe.Municipio LIKE '%$buscador%' OR pe.Fecha LIKE '%$buscador%' OR pe.Total LIKE '%$buscador%' ORDER BY pe.Total ASC";
    }
    else if($filter == "a-z"){
        $sql = "SELECT pe.id_pedido as 'id_pedido', c.Nombre as 'Nombre', c.Apellido as 'Apellido', pe.Municipio as 'Direccion', pe.Fecha as 'Fecha', pe.Total as 'Total'
        FROM cliente c INNER JOIN pedido pe ON c.id_cliente = pe.id_cliente WHERE pe.id_pedido LIKE '%$buscador%' OR c.Nombre LIKE '%$buscador%' OR c.Apellido LIKE '%$buscador%' OR pe.Municipio LIKE '%$buscador%' OR pe.Fecha LIKE '%$buscador%' OR pe.Total LIKE '%$buscador%' ORDER BY c.Nombre ASC";
    }
    else if($filter == "z-a"){
        $sql = "SELECT pe.id_pedido as 'id_pedido', c.Nombre as 'Nombre', c.Apellido as 'Apellido', pe.Municipio as 'Direccion', pe.Fecha as 'Fecha', pe.Total as 'Total'
        FROM cliente c INNER JOIN pedido pe ON c.id_cliente = pe.id_cliente WHERE pe.id_pedido LIKE '%$buscador%' OR c.Nombre LIKE '%$buscador%' OR c.Apellido LIKE '%$buscador%' OR pe.Municipio LIKE '%$buscador%' OR pe.Fecha LIKE '%$buscador%' OR pe.Total LIKE '%$buscador%' ORDER BY c.Nombre DESC";
    }
    else if($filter == "no-entregado"){
        $sql = "SELECT pe.id_pedido as 'id_pedido', c.Nombre as 'Nombre', c.Apellido as 'Apellido', pe.Municipio as 'Direccion', pe.Fecha as 'Fecha', pe.Total as 'Total'
        FROM cliente c INNER JOIN pedido pe ON c.id_cliente = pe.id_cliente WHERE pe.id_pedido LIKE '%$buscador%' OR c.Nombre LIKE '%$buscador%' OR c.Apellido LIKE '%$buscador%' OR pe.Municipio LIKE '%$buscador%' OR pe.Fecha LIKE '%$buscador%' OR pe.Total LIKE '%$buscador%'";
    }
    $conexion = mysqli_connect("localhost", "root", "", "grappe1");
    mysqli_query($conexion, "SET NAMES 'utf8'");
    $res = mysqli_query($conexion, $sql);
    
    $pedidos = [];
    while($pedido = mysqli_fetch_assoc($res)){
        $pedidos[] = $pedido;
    }

    $respAX = [
        "pedidos" => $pedidos
    ];

    echo json_encode($respAX);

?>