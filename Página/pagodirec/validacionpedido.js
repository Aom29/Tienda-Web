document.addEventListener('DOMContentLoaded', function () {
    const validation = new JustValidate('.form', {
        // Configura las reglas de validación para cada campo
        rules: {
            nombre: {
                required: true,
            },
            numero: {
                required: true,
                numeric: true,
            },
            colonia: {
                required: true,
            },
            municipio: {
                required: true,
            },
            estado: {
                required: true,
            },
            cp: {
                required: true,
                numeric: true,
                minLength: 5,
                maxLength: 5,
            },
            pais: {
                required: true,
            },
        },
        // Define los mensajes de error para cada campo
        messages: {
            nombre: {
                required: 'Por favor ingresa la calle',
            },
            numero: {
                required: 'Por favor ingresa el número',
                numeric: 'El número debe ser numérico',
            },
            colonia: {
                required: 'Por favor ingresa la colonia',
            },
            municipio: {
                required: 'Por favor ingresa el municipio',
            },
            estado: {
                required: 'Por favor ingresa el estado',
            },
            cp: {
                required: 'Por favor ingresa el código postal',
                numeric: 'El código postal debe ser numérico',
                minLength: 'El código postal debe tener 5 dígitos',
                maxLength: 'El código postal debe tener 5 dígitos',
            },
            pais: {
                required: 'Por favor ingresa el país',
            },
        },
        // Personaliza el manejo de eventos al validar
        submitHandler: function (form, values, ajax) {
            // Aquí puedes manejar el envío del formulario si es necesario
            console.log('Formulario válido y listo para enviar');
        },
    });

    // Funcionalidad del botón de guardar usando SweetAlert para confirmación
    document.querySelector('.save-button').addEventListener('click', function () {
        validation.validate(); // Ejecuta la validación al hacer clic en Guardar
    });

    // Funcionalidad del botón de cancelar
    document.querySelector('.cancel-button').addEventListener('click', function () {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Deseas cancelar los cambios?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, cancelar',
            cancelButtonText: 'No, continuar',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Cancelado',
                    'Los cambios han sido cancelados.',
                    'success'
                ).then(() => {
                    window.location.reload(); // Recargar la página después de cancelar
                });
            }
        });
    });
});
