<?php
    $emailLogin = $_POST['emailLogin'];
    $idProducto = $_POST['idProducto'];

    $conexion = mysqli_connect("localhost", "root", "", "grappe1");
    mysqli_query($conexion, "SET NAMES 'utf8'");
    // Consultar el id del cliente a partir del email
    $sql = "SELECT id_cliente FROM cliente WHERE Email = '$emailLogin'";
    $res = mysqli_query($conexion, $sql);
    $idCliente = mysqli_fetch_assoc($res)['id_cliente'];
    // Borrar el producto del carrito
    $sql = "DELETE FROM producto_carrito WHERE cliente_id_cliente = $idCliente AND producto_id_producto = $idProducto";
    $res = mysqli_query($conexion, $sql);
    // Verificar si se insertó con exito el producto en el carrito
    if ($res) {
        $respAX = [
            'cod' => 1,
            'msj' => 'Producto eliminado con éxito'
        ];
    } else {
        $respAX = [
            'cod' => 0,
            'msj' => 'No se pudo eliminar el producto en la base'
        ];
    }

    echo json_encode($respAX);

?>