document.addEventListener('DOMContentLoaded', function() {
    // Obtener el valor de la opción seleccionada
    let buscador = document.getElementById('buscador').value
    let filter = document.getElementById('sort-select').value
    obtenerClientes(filter, buscador);
    document.getElementById('sort-select').addEventListener('change', function() {
        filter = this.value;
        console.log(filter);
        obtenerClientes(filter, buscador);
    });
    document.getElementById('buscador').addEventListener('change', function() {
        buscador = this.value;
        console.log(buscador);
        obtenerClientes(filter, buscador);
    });
    // Que funcione si se escribe una letra
    document.getElementById('buscador').addEventListener('keyup', function() {
        buscador = this.value;
        console.log(buscador);
        obtenerClientes(filter, buscador);
    });
    // Obtener de la base los datos la informacion de los clientes considerando el valor del filtro y buscador
    function obtenerClientes(filter,buscador) {
        $.ajax({
            url: "./adminphp/obtenerClientes_AX.php",
            type: "POST",
            data: {filter:filter,buscador:buscador},
            cache: false,
            success: (respAX) => {
                console.log(respAX);
                let objRespAX = JSON.parse(respAX);
                console.log(objRespAX);
                let clientes = objRespAX.clientes;
                // Generar las filas de la tabla
                let filas = "";
                clientes.forEach((cliente) => {
                    filas += `<tr>
                                <td data-label="ID">#${cliente.id_cliente}</td>
                                <td data-label="Nombre">${cliente.Nombre}</td>
                                <td data-label="Apellido">${cliente.Apellido}</td>
                                <td data-label="Email">${cliente.Email}</td>
                                <td data-label="Borrar"><i class="fa-solid fa-trash  ticon" data-id="${cliente.id_cliente}"></i>
                                    &nbsp; 
                                  </div>
                                </td>
                              </tr>`;
                });
                // Mostrar los datos en la página
                $("#tbodyClientes").html(filas);
            }
        });
    }

    // Eliminar un cliente al hacer click en el botón de borrar y preguntar si esta seguro de eliminar al cliente con sweetalert
    document.getElementById('tbodyClientes').addEventListener('click', (e) => {
        if (e.target.classList.contains('fa-trash')) {
            console.log(e.target.getAttribute('data-id'));
            // Eliminar de la base de datos el elemento con el id correspondiente
            let idCliente = e.target.getAttribute('data-id');
            console.log(idCliente);
            Swal.fire({
                title: '¿Estás seguro de eliminar este cliente?',
                text: "No podrás revertir esto!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminarlo!'
            }).then((result) => {
                if (result.isConfirmed) {
                    $.ajax({
                        url: "./adminphp/eliminarCliente_AX.php",
                        type: "POST",
                        data: {idCliente: idCliente},
                        cache: false,
                        success: (respAX) => {
                            console.log(respAX);
                            let objRespAX = JSON.parse(respAX);
                            console.log(objRespAX.mensaje);
                            obtenerClientes(filter, buscador);
                        }
                    });
                    Swal.fire(
                        'Eliminado!',
                        'El cliente ha sido eliminado.',
                        'success'
                    );
                }
            });
        }
    });

});
