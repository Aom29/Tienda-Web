// Todo el código de validación y lógica aquí
$(document).ready(() => {
    const validator = new JustValidate("form#nuevoProducto");
  
    validator
    .addField("#nombre",[
        {
          rule:"required",
          errorMessage:"Ingresa tu nombre"
        }
      ])
      .addField("#categoria", [
        {
          rule: "required",
          errorMessage: "La categoría es obligatoria",
        },
      ])
      .addField("#descripcion", [
        {
          rule: "required",
          errorMessage: "La descripción es obligatoria",
        },
      ])
      .addField("#precio", [
        {
          rule: "required",
          errorMessage: "El precio es obligatorio",
        },
        {
          rule: "number",
          errorMessage: "El precio debe ser un número válido",
        },
      ])
      .addField("#descuento", [
        {
          rule: "required",
          errorMessage: "El descuento es obligatorio",
        },
        {
          rule: "number",
          errorMessage: "El descuento debe ser un número válido",
        },
      ])
      .addField("input#stock", [
        {
          rule: "required",
          errorMessage: "El stock es obligatorio",
        },
        {
          rule: "number",
          errorMessage: "El stock debe ser un número válido",
        },
      ])
      .onSuccess((evt) => {
        evt.preventDefault();
        // Aquí puedes agregar el código para manejar el envío del formulario
        console.log("Formulario válido y listo para enviar");
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¿Deseas guardar los cambios?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, guardar',
            cancelButtonText: 'No, cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                let isValid = false; // CAMBIAR DEPENDIENDO DE LA RESPUESTA DE LA BASE
                    if (isValid) {
                        Swal.fire(
                            'Guardado',
                            'Los cambios han sido guardados con éxito.',
                            'success'
                        ).then(() => {
                            // Aquí puedes agregar el código para manejar el envío del formulario
                            console.log('Formulario enviado');
                        });
                    } else {
                        Swal.fire(
                            'Error',
                            'El producto no se pudo registrar correctamente',
                            'error'
                        );
                    }
            }
        });
      });
  
    // // Funcionalidad del botón de guardar
    // document.querySelector('.save-button').addEventListener('click', function() {
    //     Swal.fire({
    //         title: '¿Estás seguro?',
    //         text: "¿Deseas guardar los cambios?",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Sí, guardar',
    //         cancelButtonText: 'No, cancelar'
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             validation.revalidate().then((isValid) => {
    //                 if (isValid) {
    //                     Swal.fire(
    //                         'Guardado',
    //                         'Los cambios han sido guardados con éxito.',
    //                         'success'
    //                     ).then(() => {
    //                         // Aquí puedes agregar el código para manejar el envío del formulario
    //                         console.log('Formulario enviado');
    //                     });
    //                 } else {
    //                     Swal.fire(
    //                         'Error',
    //                         'Por favor, completa todos los campos obligatorios.',
    //                         'error'
    //                     );
    //                 }
    //             });
    //         }
    //     });
    // });

    // Funcionalidad del botón de cancelar
    document.querySelector('.cancel-button').addEventListener('click', function() {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¿Deseas cancelar los cambios?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, cancelar',
            cancelButtonText: 'No, continuar'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Cancelado',
                    'Los cambios han sido cancelados.',
                    'success'
                ).then(() => {
                    window.location.reload();
                });
            }
        });
    });
});