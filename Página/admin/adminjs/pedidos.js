document.addEventListener('DOMContentLoaded', function() {
    // Obtener el valor de la opción seleccionada
    let buscador = document.getElementById('buscador').value
    let filter = document.getElementById('sort-select-pedidos').value
    obtenerPedidos(filter, buscador);
    document.getElementById('sort-select-pedidos').addEventListener('change', function() {
        filter = this.value;
        console.log(filter);
        obtenerPedidos(filter, buscador);
    });
    document.getElementById('buscador').addEventListener('change', function() {
        buscador = this.value;
        console.log(buscador);
        obtenerPedidos(filter, buscador);
    });
    // Que funcione si se escribe una letra
    document.getElementById('buscador').addEventListener('keyup', function() {
        buscador = this.value;
        console.log(buscador);
        obtenerPedidos(filter, buscador);
    });
    
    // Obtener de la base los datos la informacion de los pedidos considerando el valor del filtro y buscador
    function obtenerPedidos(filter, buscador){
        $.ajax({
            url: "./adminphp/obtenerPedidos_AX.php",
            type: "POST",
            data: {filter:filter,buscador:buscador},
            cache: false,
            success: (respAX) => {
                console.log(respAX);
                let objRespAX = JSON.parse(respAX);
                console.log(objRespAX);
                let pedidos = objRespAX.pedidos;
                // Generar las filas de la tabla
                let filas = "";
                pedidos.forEach((pedido) => {
                    filas += `<tr>
                                <td data-label="ID">#${pedido.id_pedido}</td>
                                <td data-label="Nombre">${pedido.Nombre}</td>
                                <td data-label="Apellido">${pedido.Apellido}</td>
                                <td data-label="Dirección">${pedido.Direccion}</td>
                                <td data-label="Fecha">${pedido.Fecha}</td>
                                <td data-label="Total">$${pedido.Total}</td>
                                <td data-label="Estado" style="position: relative;">
                                  <span class="pe" class="letra"></span>Pending
                              </td>
                                <td data-label="Acción">
                                    <i class="fa-solid fa-eye ticon" data-id="${pedido.id_pedido}"></i>&nbsp;
                                    <i class="fa fa-angle-down ticon dropbtn"></i>
                                    <div class="dropdown-content">
                                        <a href="#">Eliminar</a>
                                        <a href="#">Enviado</a>
                                    </div>
                                </td>
                              </tr>`;
                });
                // Mostrar los datos en la página
                $("#tbodyPedidos").html(filas);
            }
        });
    }

    // Mostrar datos del pedido al hacer click en el icono de ojo con una consulta a la base de datos en el siguiente modal
    // Agregar modal con datos del pedido: Id, Nombre, Apellido, Calle, Numero exterior, Colonia, Municipio, Estado, Codigo Postal, Pais, Total, Fecha, Tabla de productos (Nombre, Precio, Cantidad)
    document.getElementById('tbodyPedidos').addEventListener('click', (e) => {
        if (e.target.classList.contains('fa-eye')) {
            console.log(e.target.getAttribute('data-id'));
            // Mostrar modal con los datos del pedido
            let idPedido = e.target.getAttribute('data-id');
            console.log(idPedido);
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
                    let Direccion = pedido.Calle + " " + pedido.Numero_exterior + ", " + pedido.Colonia + ", " + pedido.Municipio + ", " + pedido.Estado + ", " + pedido.Codigo_postal + ", " + pedido.Pais;
                    // Mostrar los datos en el modal
                    $("#modalPedido").html(`
                        <div class="modal-content">
                            <span class="close">&times;</span>
                            <h2>Detalles del pedido</h2>
                            <div class="modal-body">
                                <p>ID: ${pedido.id_pedido}</p>
                                <p>Nombre: ${pedido.Nombre}</p>
                                <p>Apellido: ${pedido.Apellido}</p>
                                <p>Dirección: ${Direccion}</p>
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
                    // // Mostrar el modal
                    // let modal = document.getElementById('modal');
                    // let span = document.getElementsByClassName("close")[0];
                    // modal.style.display = "block";
                    // span.onclick = function() {
                    //     modal.style.display = "none";
                    // }
                    // window.onclick = function(event) {
                    //     if (event.target == modal) {
                    //         modal.style.display = "none";
                    //     }
                    // }
                    showModal();
                }
            });
        }
    });
});

// Funcion para mostrar el modal
function showModal() {
    let modal = document.getElementById('modalPedido');
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
