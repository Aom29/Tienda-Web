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
                                <td data-label="Account">#${cliente.id_cliente}</td>
                                <td data-label="Amount">${cliente.Nombre}</td>
                                <td data-label="Amount">${cliente.Apellido}</td>
                                <td data-label="Amount">${cliente.Email}</td>
                                <td data-label="Period"><i class="fa-solid fa-trash  ticon"></i>
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

});
