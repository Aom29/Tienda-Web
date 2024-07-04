document.addEventListener('DOMContentLoaded', function() {
    // Validar el formulario
    const validation = new JustValidate('form#editForm');
    // Configura las reglas de validación para cada campo
    validation
        .addField('input#nombre', {
            rules: 'required',
            errorMessage: 'Por favor ingresa el nombre del producto'
        })
        // .addField('input#descripcion', {
        //     rules: 'required',
        //     errorMessage: 'Por favor ingresa la descripción del producto'
        // })
        // .addField('input#precio', {
        //     rules: 'required',
        //     errorMessage: 'Por favor ingresa el precio del producto'
        // })
        // .addField('input#descuento', {
        //     rules: 'required',
        //     errorMessage: 'Por favor ingresa el descuento del producto'
        // })
        // .addField('input#stock', {
        //     rules: 'required',
        //     errorMessage: 'Por favor ingresa el stock del producto'
        // })
        // .addField('select#categoria', {
        //     rules: 'required',
        //     errorMessage: 'Por favor selecciona la categoría del producto'
        // })
        .onSuccess((evt) => {
            evt.preventDefault();
            console.log("Formulario válido");
            // Obtener los valores de los campos
            let id_producto = evt.target.getAttribute('data-id');
            let nombre = evt.target.querySelector('input#nombre').value;
            let descripcion = evt.target.querySelector('input#descripcion').value;
            let precio = evt.target.querySelector('input#precio').value;
            let descuento = evt.target.querySelector('input#descuento').value;
            let stock = evt.target.querySelector('input#stock').value;
            let categoria = evt.target.querySelector('select#categoria').value;
            // Enviar los datos del formulario a la base de datos
            $.ajax({
                url: './adminphp/actualizaProducto_AX.php',
                type: 'POST',
                data: {
                    id_producto: id_producto,
                    nombre: nombre,
                    descripcion: descripcion,
                    precio: precio,
                    descuento: descuento,
                    stock: stock,
                    categoria: categoria
                },
                cache: false,
                success: function(respAX) {
                    console.log(respAX);
                    let objRespAX = JSON.parse(respAX);
                    console.log(objRespAX);
                    // Con sweet Alert
                    if (objRespAX.status == 0) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: objRespAX.msg,
                        });
                    } else {
                        Swal.fire({
                            icon: 'success',
                            title: 'Éxito',
                            text: objRespAX.msg,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.reload();
                            }
                        });
                      }
                }
            });
            
        });
});