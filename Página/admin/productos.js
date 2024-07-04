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

    
    // Obtener de la base los datos la informacion de los productos considerando el valor del filtro y buscador
    function obtenerProductos(filter,buscador) {
        $.ajax({
            url: "./adminphp/obtenerProductos_AX.php",
            type: "POST",
            data: {filter:filter,buscador:buscador},
            cache: false,
            success: (respAX) => {
                // console.log(respAX);
                let objRespAX = JSON.parse(respAX);
                // console.log(objRespAX);
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
                                    <i class="fa-solid fa-pen-to-square  ticon" data-id="${producto.id_producto}"></i>&nbsp;
                                    <i class="fa-solid fa-trash ticon" data-id="${producto.id_producto}"></i>
                                </td>
                              </tr>`;
                });
                // Mostrar los datos en la página
                $("#tbodyProductos").html(filas);
            }
        });
    }

    // Poder editar la información de un producto si se da click en el icono con la clase fa-pen-to-square en el siguiente modal
    /*
                    <div class="modal-content">
                        <span class="close" onclick="closeModal()">&times;</span>
                        <h2>Editar Producto</h2>
                        <form id="editForm">

                          <div class="form-fields">
                            <div class="input-group half-width">
                              <input type="text" id="nombre" autocomplete="off" required>
                              <label for="nombre">Nombre</label>
                            </div>
                            <div class="input-group half-width">
                              <select id="categoria" required>
                                <option value="" disabled selected>Selecciona una categoría</option>
                                <option value="categoria1">Categoría 1</option>
                                <option value="categoria2">Categoría 2</option>
                                <option value="categoria3">Categoría 3</option>
                            </select>
                            <label for="categoria"></label>
                            </div>
                            <div class="input-group full-width">
                              <input type="text" id="descripcion" autocomplete="off" required>
                              <label for="descripcion">Descripción</label>
                            </div>
                            <div class="input-group one-third-width">
                              <input type="text" id="precio" autocomplete="off" oninput="validarNumeros(this)" required>
                              <label for="precio">Precio</label>
                            </div>
                            <div class="input-group one-third-width">
                              <input type="text" id="descuento"  oninput="validarNumeros(this)" autocomplete="off">
                              <label for="descuento">Descuento</label>
                            </div>
                            <div class="input-group one-third-width">
                              <input type="text" id="stock" autocomplete="off" oninput="validarNumeros(this)" required>
                              <label for="stock">Stock</label>
                            </div>
                        </div>
                        <div class="button-container">
                          <button class="save-button">Guardar</button>
                      </div>
                    </div>
                        </form>
                    </div>
    */
    document.getElementById('tbodyProductos').addEventListener('click', function(e) {
        if (e.target.classList.contains('fa-pen-to-square')) {
            console.log(e.target.getAttribute('data-id'));
            // Mostrar modal con los datos del producto
            let idProducto = e.target.getAttribute('data-id');
            console.log(idProducto);
            $.ajax({
                url: "./adminphp/obtenerProducto_AX.php",
                type: "POST",
                data: {idProducto:idProducto},
                cache: false,
                success: (respAX) => {
                    console.log(respAX);
                    let objRespAX = JSON.parse(respAX);
                    console.log(objRespAX);
                    let producto = objRespAX.producto;
                    let categorias = objRespAX.categorias;
                    console.log("Categoria del producto " + producto.Categoria);
                    // Mostrar los datos en el modal, agregando las opciones de categorias en el select tambien, desde la definicion del modal
                    let modalProducto = "";
                    modalProducto += `
                    <div class="modal-content">
                        <span class="close" onclick="closeModal()">&times;</span>
                        <h2>Editar Producto</h2>
                        <form id="editForm">
                          <div class="form-fields">
                            <div class="input-group half-width">
                              <input type="text" id="nombreEdit" autocomplete="off" required value="${producto.Nombre}">
                              <label for="nombre">Nombre</label>
                            </div>
                            <div class="input-group half-width">
                              <select id="categoriaEdit" required>`;
                    categorias.forEach((categoria) => {
                        modalProducto += `<option value="${categoria.Nombre}" ${categoria.Nombre == producto.Categoria ? 'selected' : ''}>${categoria.Nombre}</option>`;
                    });
                    modalProducto += `</select>
                            <label for="categoria"></label>
                            </div>
                            <div class="input-group full-width">
                              <input type="text" id="descripcionEdit" autocomplete="off" required value="${producto.Descripcion}">
                              <label for="descripcion">Descripción</label>
                            </div>
                            <div class="input-group one-third-width">
                              <input type="text" id="precioEdit" autocomplete="off" oninput="validarNumeros(this)" required value="${producto.Precio}">
                              <label for="precio">Precio</label>
                            </div>
                            <div class="input-group one-third-width">
                              <input type="text" id="descuentoEdit"  oninput="validarNumeros(this)" autocomplete="off" value="${producto.Descuento}">
                              <label for="descuento">Descuento</label>
                            </div>
                            <div class="input-group one-third-width">
                              <input type="text" id="stockEdit" autocomplete="off" oninput="validarNumeros(this)" required value="${producto.Stock}">
                              <label for="stock">Stock</label>
                            </div>
                        </div>
                        <div class="button-container">
                          <button class="save-button" data-id="${producto.id_producto}">Guardar</button>
                      </div>
                    </div>
                        </form>
                    </div>`;
                    // Mostrar los productos en el modal
                    $("#modalProducto").html(modalProducto);
                    showModal(); 
                }
            });
        }    
    });
    // En caso de que se quiera guardar la información del producto hacer el update en la base de datos
    document.getElementById('modalProducto').addEventListener('click', function(e) {
        if (e.target.classList.contains('save-button')) {
            // Verificar que los campos esten llenos
            console.log(e.target.getAttribute('data-id'));
            let idProducto = e.target.getAttribute('data-id');
            let nombre = document.getElementById('nombreEdit').value;
            let categoria = document.getElementById('categoriaEdit').value;
            let descripcion = document.getElementById('descripcionEdit').value;
            let precio = document.getElementById('precioEdit').value;
            let descuento = document.getElementById('descuentoEdit').value;
            let stock = document.getElementById('stockEdit').value;

            console.log("Nombre: " + nombre);
            console.log("Categoria: " + categoria);
            console.log("Descripcion: " + descripcion);
            console.log("Precio: " + precio);
            console.log("Descuento: " + descuento);
            console.log("Stock: " + stock);

            $.ajax({
                url: "./adminphp/actualizaProducto_AX.php",
                type: "POST",
                data: {idProducto:idProducto,nombre:nombre,categoria:categoria,descripcion:descripcion,precio:precio,descuento:descuento,stock:stock},
                cache: false,
                success: (respAX) => {
                    console.log(respAX);
                    let objRespAX = JSON.parse(respAX);
                    console.log(objRespAX);
                    // Sweet alert con error o exito
                    if (objRespAX.status == 0) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: objRespAX.msj
                        });
                    }
                    else {
                        Swal.fire({
                            icon: 'success',
                            title: 'Éxito',
                            text: objRespAX.msj
                        });
                        // obtenerProductos(filter, buscador);
                    }
                }
            });
        }
    });
});

// Funcion para mostrar el modal
function showModal() {
    let modal = document.getElementById('modalProducto');
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
