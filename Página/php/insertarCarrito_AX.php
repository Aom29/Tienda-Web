<?php
    $emailLogin = $_POST['emailLogin'];
    $idProducto = $_POST['idProducto'];

    $conexion = mysqli_connect("localhost", "root", "", "grappe1");
    mysqli_query($conexion, "SET NAMES 'utf8'");
    // Consultar el id del cliente a partir del email
    $sql = "SELECT id_cliente FROM cliente WHERE Email = '$emailLogin'";
    $res = mysqli_query($conexion, $sql);
    $idCliente = mysqli_fetch_assoc($res)['id_cliente'];
    // Insertar el producto en el carrito
    $sql = "INSERT INTO producto_carrito (`cliente_id_cliente`, `producto_id_producto`, `cantidad`) VALUES ($idCliente, $idProducto, 1);";
    $res = mysqli_query($conexion, $sql);
    // Verificar si se insertó con exito el producto en el carrito
    if ($res) {
        $respAX = [
            'cod' => 1,
            'msj' => 'Producto insertado con éxito'
        ];
    } else {
        $respAX = [
            'cod' => 0,
            'msj' => 'No se pudo insertar el producto en la base'
        ];
    }

    echo json_encode($respAX);

?>