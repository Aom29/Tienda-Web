<?php
    $emailLogin = $_POST['emailLogin'];

    $conexion = mysqli_connect("localhost", "root", "", "grappe1");
    mysqli_query($conexion, "SET NAMES 'utf8'");
    // Consultar el id del cliente a partir del email
    $sql = "SELECT id_cliente FROM cliente WHERE Email = '$emailLogin'";
    $res = mysqli_query($conexion, $sql);
    $idCliente = mysqli_fetch_assoc($res)['id_cliente'];
    // Eliminar del carrito
    $sql = "DELETE FROM producto_carrito WHERE cliente_id_cliente = $idCliente";
    // Verificar si se eliminaron con exito los productos del carrito
    if (mysqli_query($conexion, $sql)) {
        $respAX = [
            'cod' => 1,
            'msj' => 'Productos eliminados con éxito'
        ];
    } else {
        $respAX = [
            'cod' => 0,
            'msj' => 'No se pudieron eliminar los productos de la base'
        ];
    }

  echo json_encode($respAX);




?>