<?php
    $idPedido = $_POST['idPedido'];
    // Hacer la consulta a la base de datos para obtener los datos relacionados con el siguiente codigo
    /*
        $.ajax({
                url: "./adminphp/obtenerPedido_AX.php",
                type: "POST",
                data: {idPedido:idPedido},
                cache: false,
                success: (respAX) => {
                    console.log(respAX);
                    let objRespAX = JSON.parse(respAX);
                    console.log(objRespAX);
                    let pedido = objRespAX.pedido;
                    // Mostrar los datos en el modal
                    $("#modalPedido").html(`
                        <div class="modal-content">
                            <span class="close">&times;</span>
                            <h2>Detalles del pedido</h2>
                            <div class="modal-body">
                                <p>ID: ${pedido.id_pedido}</p>
                                <p>Nombre: ${pedido.Nombre}</p>
                                <p>Apellido: ${pedido.Apellido}</p>
                                <p>Dirección: ${pedido.Direccion}</p>
                                <p>Fecha: ${pedido.Fecha}</p>
                                <p>Total: $${pedido.Total}</p>
                                <p>Estado: Pending</p>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Precio</th>
                                            <th>Cantidad</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbodyProductos">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    `);
                    // Mostrar los productos en el modal
                    let productos = pedido.productos;
                    let filas = "";
                    productos.forEach((producto) => {
                        filas += `<tr>
                                    <td>${producto.Nombre}</td>
                                    <td>$${producto.Precio}</td>
                                    <td>${producto.Cantidad}</td>
                                  </tr>`;
                    });
                    $("#tbodyProductos").html(filas);
                    // Mostrar el modal
                    let modal = document.getElementById('modal');
                    let span = document.getElementsByClassName("close")[0];
                    modal.style.display = "block";
                    span.onclick = function() {
                        modal.style.display = "none";
                    }
                    window.onclick = function(event) {
                        if (event.target == modal) {
                            modal.style.display = "none";
                        }
                    }
                }
            });
    */
    $conexion = mysqli_connect("localhost", "root", "", "grappe1");
    mysqli_query($conexion, "SET NAMES 'utf8'");
    // Se debe obtener Id, Nombre, Apellido, Calle, Numero exterior, Colonia, Municipio, Estado, Codigo Postal, Pais, Total, Fecha
    $sql = "SELECT pe.id_pedido as 'id_pedido', c.Nombre as 'Nombre', c.Apellido as 'Apellido', pe.Calle as 'Calle', pe.`Numero Exterior` as 'Numero_exterior', pe.Colonia as 'Colonia', pe.Municipio as 'Municipio', pe.Estado as 'Estado', pe.`Codigo Postal` as 'Codigo_postal', pe.Pais as 'Pais', pe.Total as 'Total', pe.Fecha as 'Fecha'
    FROM cliente c INNER JOIN pedido pe ON c.id_cliente = pe.id_cliente WHERE pe.id_pedido = $idPedido";
    $res = mysqli_query($conexion, $sql);
    $pedido = mysqli_fetch_assoc($res);
    // Se debe obtener Nombre, Precio, Cantidad
    $sql = "SELECT p.Nombre as 'Nombre', p.Precio as 'Precio', pp.cantidad as 'Cantidad'
    FROM producto p INNER JOIN pedido_has_producto pp ON p.id_producto = pp.id_producto WHERE pp.id_pedido = $idPedido";
    $res = mysqli_query($conexion, $sql);
    $productos = [];
    while($producto = mysqli_fetch_assoc($res)){
        $productos[] = $producto;
    }
    $pedido["productos"] = $productos;
    $respAX = [
        "pedido" => $pedido
    ];
    echo json_encode($respAX);

?>