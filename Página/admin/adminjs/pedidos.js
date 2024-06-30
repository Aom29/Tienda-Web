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
                                    <i class="fa-solid fa-eye ticon"></i>&nbsp;
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

});
