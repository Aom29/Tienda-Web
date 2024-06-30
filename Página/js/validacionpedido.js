document.addEventListener('DOMContentLoaded', function () {
    let emailLogin = localStorage.getItem("emailLogin");
    console.log("Email de login: " + emailLogin);
    const validation = new JustValidate('form#datosPedido');
        // Configura las reglas de validación para cada campo
    validation
    .addField("input#nombre", [
        {
            rule: "required",
            errorMessage: "Por favor ingresa la calle",
        },
    ])
    .addField("input#numero", [
        {
            rule: "required",
            errorMessage: "Por favor ingresa el número",
        },
        {
            rule: "number",
            errorMessage: "El número debe ser numérico",
        },
    ])
    .addField("input#colonia", [
        {
            rule: "required",
            errorMessage: "Por favor ingresa la colonia",
        },
    ])
    .addField("input#municipio", [
        {
            rule: "required",
            errorMessage: "Por favor ingresa el municipio",
        },
    ])
    .addField("input#estado", [
        {
            rule: "required",
            errorMessage: "Por favor ingresa el estado",
        },
    ])
    .addField("input#cp", [
        {
            rule: "required",
            errorMessage: "Por favor ingresa el código postal",
        },
        {
            rule: "number",
            errorMessage: "El código postal debe ser numérico",
        },
        {
            rule: "minLength",
            value: 5,
            errorMessage: "El código postal debe tener 5 dígitos",
        },
        {
            rule: "maxLength",
            value: 5,
            errorMessage: "El código postal debe tener 5 dígitos",
        },
    ])
    .addField("input#pais", [
        {
            rule: "required",
            errorMessage: "Por favor ingresa el país",
        },
    ])
    .onSuccess((evt)=>{
        evt.preventDefault();
        console.log("Formulario válido y listo para enviar");
        // Generar pedido en la base de datos
        // Guardar los datos del formulario
        let calle = $("input#nombre").val();
        let numero = $("input#numero").val();
        let colonia = $("input#colonia").val();
        let municipio = $("input#municipio").val();
        let estado = $("input#estado").val();
        let cp = $("input#cp").val();
        let pais = $("input#pais").val();
        // Enviar los datos del formulario
        $.ajax({
            url:"./pagodirec/phppago/hacerPedido_AX.php",
            type: "POST",
            data: {
                emailLogin: emailLogin,
                calle: calle,
                numero: numero,
                colonia: colonia,
                municipio: municipio,
                estado: estado,
                cp: cp,
                pais: pais
            },
            cache: false,
            success:(respAX)=>{
                console.log(respAX);
                let objRespAX = JSON.parse(respAX);
                let mensaje = objRespAX.msj;
                let exito = objRespAX.cod;
                let saldo = objRespAX.saldo;
                if(exito == 0){
                    Swal.fire({
                        title: "Error al generar pedido",
                        text: mensaje + saldo,
                        icon: "error",
                    });
                }
                else{
                    Swal.fire({
                        title: "Pedido enviado",
                        text: "Tu pedido ha sido enviado correctamente",
                        icon: "success",
                        didDestroy:()=>{
                            show("Progreso");
                        }
                    });
                }
            }
        });
    });

    // // Funcionalidad del botón de guardar usando SweetAlert para confirmación
    // document.querySelector('.save-button').addEventListener('click', function () {
    //     validation.validate(); // Ejecuta la validación al hacer clic en Guardar
    // });

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
