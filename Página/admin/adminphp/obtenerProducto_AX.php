<?php
    // Obtener los datos para la siguiente consulta
    /*
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
                    // Mostrar los datos en el modal
                    $("#modalProducto").html(`
                        <div class="modal-content">
                            <span class="close" onclick="closeModal()">&times;</span>
                            <h2>Editar Producto</h2>
                            <form id="editForm">
                              <div class="form-fields">
                                <div class="input-group half-width">
                                  <input type="text" id="nombre" autocomplete="off" required value="${producto.Nombre}">
                                  <label for="nombre">Nombre</label>
                                </div>
                                <div class="input-group half-width">
                                  <select id="categoria" required>
                                    <option value="${producto.Categoria}" selected>${producto.Categoria}</option>
                                    <option value="categoria1">Categoría 1</option>
                                    <option value="categoria2">Categoría 2</option>
                                    <option value="categoria3">Categoría 3</option>
                                </select>
                                <label for="categoria"></label>
                                </div>
                                <div class="input-group full-width">
                                  <input type="text" id="descripcion" autocomplete="off" required value="${producto.Descripcion}">
                                  <label for="descripcion">Descripción</label>
                                </div>
                                <div class="input-group one-third-width">
                                  <input type="text" id="precio" autocomplete="off" oninput="validarNumeros(this)" required value="${producto.Precio}">
                                  <label for="precio">Precio</label>
                                </div>
                                <div class="input-group one-third-width">
                                  <input type="text" id="descuento"  oninput="validarNumeros(this)" autocomplete="off" value="${producto.Descuento}">
                                  <label for="descuento">Descuento</label>
                                </div>
                                <div class="input-group one-third-width">
                                  <input type="text" id="stock" autocomplete="off" oninput="validarNumeros(this)" required value="${producto.Stock}">
                                  <label for="stock">Stock</label>
                                </div>
                            </div>
                            <div class="button-container">
                              <button class="save-button">Guardar</button>
                            </div>
                            </form>
                        </div>
                    `);
                    showModal();
                }
            });
    */
    // También incluir un valor con un arreglo con todas las categorias de la base de datos
    $idProducto = $_POST["idProducto"];
    $sql = "SELECT p.id_producto as 'id_producto', p.Nombre as 'Nombre', p.Descripcion as 'Descripcion', c.Nombre as 'Categoria', p.Precio as 'Precio', p.Descuento as 'Descuento', p.Stock as 'Stock'
            FROM producto p INNER JOIN categoria c ON p.id_categoria = c.id_categoria WHERE p.id_producto = $idProducto";
    $conexion = mysqli_connect("localhost", "root", "", "grappe1");
    mysqli_query($conexion, "SET NAMES 'utf8'");
    $res = mysqli_query($conexion, $sql);
    $producto = mysqli_fetch_assoc($res);
    $sql = "SELECT * FROM categoria";
    $res = mysqli_query($conexion, $sql);
    $categorias = [];
    while($cat = mysqli_fetch_assoc($res)){
        $categorias[] = $cat;
    }
    $respAX["producto"] = $producto;
    $respAX["categorias"] = $categorias;
    
    echo json_encode($respAX);

?>