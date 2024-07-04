$(document).ready(function() {
    // Cargar categorías usando AJAX al cargar la página
    $.ajax({
        url: 'adminphp/categoria.php', // Ruta al archivo PHP que obtiene las categorías
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            // Cuando la solicitud es exitosa, agregar las opciones al elemento select
            var select = $('#categoria');
            select.empty(); // Limpiar las opciones actuales
            select.append('<option value="" disabled selected>Selecciona una categoría</option>');
            response.forEach(function(categoria) {
                select.append('<option value="' + categoria.id_categoria + '">' + categoria.Nombre + '</option>');
            });
        },
        error: function(xhr, status, error) {
            console.error('Error al cargar categorías:', error);
            // Manejar el error aquí, como mostrar un mensaje al usuario
        }
    });

    // Manejar el envío del formulario para agregar productos
    $('#productform').on('submit', function(e) {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    
        if ($(this).find('.save-button').is(':focus')) {
            // Verificar que los campos estén llenos
            let idProducto = $(this).find('.save-button').data('id');
            let nombre = $('#nombre').val().trim();
            let categoria = $('#categoria').val().trim();
            let descripcion = $('#descripcion').val().trim();
            let precio = $('#precio').val().trim();
            let descuento = $('#descuento').val().trim();
            let stock = $('#stock').val().trim();
    
            console.log("Nombre: " + nombre);
            console.log("Categoria: " + categoria);
            console.log("Descripcion: " + descripcion);
            console.log("Precio: " + precio);
            console.log("Descuento: " + descuento);
            console.log("Stock: " + stock);
    
            $.ajax({
                url: "añadirProducto_AX.php",
                type: "POST",
                data: {
                    idProducto: idProducto,
                    nombre: nombre,
                    categoria: categoria,
                    descripcion: descripcion,
                    precio: precio,
                    descuento: descuento,
                    stock: stock
                },
                cache: false,
                success: function(response) {
                    console.log(response);
                    let objresponse = JSON.parse(response);
                    console.log(objresponse);
    
                    // SweetAlert con mensaje de error o éxito
                    if (objresponse.status == 0) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: objresponse.message
                        });
                    } else {
                        Swal.fire({
                            icon: 'success',
                            title: 'Éxito',
                            text: objresponse.message
                        });
                        // Aquí podrías llamar a una función para obtener y actualizar la lista de productos
                        // obtenerProductos(filter, buscador);
                    }
                },
                error: function(xhr, status, error) {
                    console.error('Error en la solicitud AJAX:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Hubo un problema al procesar la solicitud.'
                    });
                }
            });
        }
    });
});


