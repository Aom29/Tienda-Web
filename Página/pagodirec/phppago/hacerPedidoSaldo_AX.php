<?php
    $emailLogin = $_POST['emailLogin'];
    $calle = $_POST['calle'];
    $numero = $_POST['numero'];
    $colonia = $_POST['colonia'];
    $municipio = $_POST['municipio'];
    $estado = $_POST['estado'];
    $cp = $_POST['cp'];
    $pais = $_POST['pais'];

    $conexion = mysqli_connect("localhost", "root", "", "grappe1");
    mysqli_query($conexion, "SET NAMES 'utf8'");
    // Consultar el id del cliente a partir del email
    $sql = "SELECT * FROM cliente WHERE Email = '$emailLogin'";
    $res = mysqli_query($conexion, $sql);
    // Guardar el $idCliente, $saldo
    $row = mysqli_fetch_assoc($res);
    $idCliente = $row['id_cliente'];
    $saldo = $row['Saldo'];
    // Calcular total ($total)
    $sql = "SELECT SUM(cantidad*(Precio*((100-Descuento)/100))) as total FROM producto p
            INNER JOIN producto_carrito pc on p.id_producto = pc.producto_id_producto
            INNER JOIN cliente c on pc.cliente_id_cliente = c.id_cliente
            WHERE id_cliente = $idCliente";
    $res = mysqli_query($conexion, $sql);
    $total = mysqli_fetch_assoc($res)['total'];
    // Verificar si el saldo disponible es suficiente
    if($saldo < $total){
        // RespAX con "msj" de saldo insuficiente y los otros atributos
        $respAX = [
            "saldo" => $saldo,
            "cod" => 0,
            "msj" => "Saldo insuficiente"
        ]; 
        echo json_encode($respAX);
        exit();
    }
    // Verificar si el stock de los productos es suficiente
    $sql = "SELECT * FROM producto p
            INNER JOIN producto_carrito pc on p.id_producto = pc.producto_id_producto
            INNER JOIN cliente c on pc.cliente_id_cliente = c.id_cliente
            WHERE id_cliente = $idCliente";
    $res = mysqli_query($conexion, $sql);
    while($fila = mysqli_fetch_assoc($res)){
        $idProducto = $fila['id_producto'];
        $cantidad = $fila['cantidad'];
        $sql = "SELECT Stock FROM producto WHERE id_producto = $idProducto";
        $stock = mysqli_fetch_assoc(mysqli_query($conexion, $sql))['Stock'];
        if($stock < $cantidad){
            // RespAX con "msj" de stock insuficiente y los otros atributos
            $respAX = [
                "cod" => 0,
                "msj" => "Stock insuficiente"
            ];
            echo json_encode($respAX);
            exit();
        }
    }

    // Si no hay productos en el carrito regresar cod=0
    if(mysqli_num_rows($res) == 0){
        $respAX = [
            "cod" => 0,
            "msj" => "No hay productos en el carrito"
        ];
        echo json_encode($respAX);
        exit();
    }
    
    // Insertar pedido (utlizar la fecha actual) y guardar el $idPedido
    $sql = "INSERT INTO pedido(id_cliente, Calle, `Numero Exterior`, Colonia, Municipio, Estado, `Codigo Postal`, Pais, Total, Fecha, Enviado) VALUES
            ($idCliente, '$calle', $numero, '$colonia', '$municipio', '$estado', '$cp', '$pais', $total, CURDATE(), 0)";
    mysqli_query($conexion, $sql);
    $idPedido = mysqli_insert_id($conexion);
    // Consultar los productos del carrito también con el precio y descuento que se encuentran en la tabla producto
    $sql = "SELECT pc.producto_id_producto as 'producto_id_producto', pc.cantidad as 'cantidad', p.Precio as 'Precio', p.Descuento as 'Descuento' FROM producto p
            INNER JOIN producto_carrito pc on p.id_producto = pc.producto_id_producto
            INNER JOIN cliente c on pc.cliente_id_cliente = c.id_cliente
            WHERE id_cliente = $idCliente";
    $res = mysqli_query($conexion, $sql);
    // Insertar los productos del carrito en la tabla producto_pedido
    while($fila = mysqli_fetch_assoc($res)){
        $idProducto = $fila['producto_id_producto'];
        $cantidad = $fila['cantidad'];
        // precioCompra = precio * (1 - descuento)
        $precioCompra = $fila['Precio'] * (1 - $fila['Descuento']/100);
        // Insertar los productos del carrito en la tabla producto_pedido
        $sql = "INSERT INTO pedido_has_producto(id_pedido, id_producto, Cantidad, precio_compra) VALUES ($idPedido, $idProducto, $cantidad, $precioCompra)";
        mysqli_query($conexion, $sql);
    }
    // Eliminar los productos del carrito
    $sql = "DELETE FROM producto_carrito WHERE cliente_id_cliente = $idCliente";
    mysqli_query($conexion, $sql);
    // Actualizar el saldo del cliente
    $nuevoSaldo = $saldo - $total;
    $sql = "UPDATE cliente SET Saldo = $nuevoSaldo WHERE id_cliente = $idCliente";
    mysqli_query($conexion, $sql);
    
    // RespAX con "msj" de pedido realizado y los otros atributos
    $respAX = [
        "cod" => $idPedido,
        "msj" => "Pedido realizado con éxito"
    ];
    
    echo json_encode($respAX);
    ?>