document.addEventListener('DOMContentLoaded', function() {
    // Obtener el valor de la opción seleccionada
    let buscador = document.getElementById('buscador').value
    let filter = document.getElementById('sort-select').value
    obtenerProductos(filter, buscador);
    document.getElementById('sort-select').addEventListener('change', function() {
        filter = this.value;
        console.log(filter);
        obtenerProductos(filter, buscador);
    });
    document.getElementById('buscador').addEventListener('change', function() {
        buscador = this.value;
        console.log(buscador);
        obtenerProductos(filter, buscador);
    });
    // Que funcione si se escribe una letra
    document.getElementById('buscador').addEventListener('keyup', function() {
        buscador = this.value;
        console.log(buscador);
        obtenerProductos(filter, buscador);
    });

    // // Obtener de la base los datos la informacion de los productos
    // function obtenerProductos(filter) {
    //     $.ajax({
    //         url: "./adminphp/obtenerProductos_AX.php",
    //         type: "POST",
    //         data: {filter:filter},
    //         cache: false,
    //         success: (respAX) => {
    //             console.log(respAX);
    //             let objRespAX = JSON.parse(respAX);
    //             console.log(objRespAX);
    //             let productos = objRespAX.productos;
    //             // Generar las filas de la tabla
    //             let filas = "";
    //             productos.forEach((producto) => {
    //                 filas += `<tr>
    //                             <td data-label="ID">#${producto.id_producto}</td>
    //                             <td data-label="Nombre">${producto.Nombre}</td>
    //                             <td data-label="Descripción">${producto.Descripcion}</td>
    //                             <td data-label="Categoria">${producto.Categoria}</td>
    //                             <td data-label="Precio">$${producto.Precio}</td>
    //                             <td data-label="Stock">${producto.Stock}</td>
    //                             <td data-label="Estatus" style="position: relative;">
    //                                 <i class="fa-solid fa-pen-to-square  ticon"></i>&nbsp;
    //                                 <i class="fa-solid fa-trash ticon"></i>
    //                             </td>
    //                           </tr>`;
    //             });
    //             // Mostrar los datos en la página
    //             $("#tbodyProductos").html(filas);
    //         }
    //     });
    // }
    
    // Obtener de la base los datos la informacion de los productos considerando el valor del filtro y buscador
    function obtenerProductos(filter,buscador) {
        $.ajax({
            url: "./adminphp/obtenerProductos_AX.php",
            type: "POST",
            data: {filter:filter,buscador:buscador},
            cache: false,
            success: (respAX) => {
                console.log(respAX);
                let objRespAX = JSON.parse(respAX);
                console.log(objRespAX);
                let productos = objRespAX.productos;
                // Generar las filas de la tabla
                let filas = "";
                productos.forEach((producto) => {
                    filas += `<tr>
                                <td data-label="ID">#${producto.id_producto}</td>
                                <td data-label="Nombre">${producto.Nombre}</td>
                                <td data-label="Descripción">${producto.Descripcion}</td>
                                <td data-label="Categoria">${producto.Categoria}</td>
                                <td data-label="Precio">$${producto.Precio}</td>
                                <td data-label="Stock">${producto.Stock}</td>
                                <td data-label="Estatus" style="position: relative;">
                                    <i class="fa-solid fa-pen-to-square  ticon"></i>&nbsp;
                                    <i class="fa-solid fa-trash ticon"></i>
                                </td>
                              </tr>`;
                });
                // Mostrar los datos en la página
                $("#tbodyProductos").html(filas);
            }
        });
    }

});
