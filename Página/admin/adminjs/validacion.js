// Función para cargar scripts dinámicamente
function loadScript(url, callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Ejecutar el callback después de cargar el script
    script.onload = callback;

    // Agregar el script al final del cuerpo del documento
    document.body.appendChild(script);
}

// Cargar SweetAlert2
loadScript('https://cdn.jsdelivr.net/npm/sweetalert2@11', function() {
    // Cargar JustValidate después de SweetAlert2
    loadScript('https://cdn.jsdelivr.net/npm/just-validate@2.7.0/dist/js/just-validate.production.min.js', function() {
        // Todo el código de validación y lógica aquí

        document.addEventListener('DOMContentLoaded', function () {
            // Validación con JustValidate
            const validation = new JustValidate('.product', {
                errorFieldCssClass: 'is-invalid',
            });

            validation
                .addField('#nombre', [
                    {
                        rule: 'required',
                        errorMessage: 'El nombre es obligatorio',
                    },
                ])
                .addField('#categoria', [
                    {
                        rule: 'required',
                        errorMessage: 'La categoría es obligatoria',
                    },
                ])
                .addField('#descripcion', [
                    {
                        rule: 'required',
                        errorMessage: 'La descripción es obligatoria',
                    },
                ])
                .addField('#precio', [
                    {
                        rule: 'required',
                        errorMessage: 'El precio es obligatorio',
                    },
                ])
                .addField('#stock', [
                    {
                        rule: 'required',
                        errorMessage: 'El stock es obligatorio',
                    },
                ])
                .onSuccess((event) => {
                    const descuentoField = document.getElementById('descuento');
                    if (descuentoField.value.trim() === '') {
                        descuentoField.value = '0';
                    }
                    // Aquí puedes agregar el código para manejar el envío del formulario
                    console.log('Formulario válido y listo para enviar');
                });

            // Funcionalidad del botón de guardar
            document.querySelector('.save-button').addEventListener('click', function() {
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
                        validation.revalidate().then((isValid) => {
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
                                    'Por favor, completa todos los campos obligatorios.',
                                    'error'
                                );
                            }
                        });
                    }
                });
            });

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
    });
});
