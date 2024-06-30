document.addEventListener('DOMContentLoaded', function() {
    // Actualizar los datos del administrador en la base de datos
    let emailLogin = localStorage.getItem("emailLogin");
    const validator = new JustValidate("form#datosPerfil");
    validator
    .addField("input#nombre",[
        {
            rule:"required",
            errorMessage:"Ingresa tu nombre"
        }
    ])
    .addField("input#apellido",[
        {
            rule:"required",
            errorMessage:"Ingresa tu apellido"
        }
    ])
    .addField("input#correo",[
        {
            rule:"required",
            errorMessage:"Ingresa tu correo"
        },
        {
            rule:"email",
            errorMessage:"Formato incorrecto"
        }
    ])
    .addField("input#password",[
        {
            rule:"required",
            errorMessage:"Ingresa tu contraseña"
        },
        {
            rule: "password",
            errorMessage: 'Mínimo 8 caracteres, incluidos una letra y un número'
        }
    ])
    .addField("input#password1",[
        {
            rule:"required",
            errorMessage:"Ingresa tu contraseña"
        },
        {
            rule: "password",
            errorMessage: 'Mínimo 8 caracteres, incluidos una letra y un número'
        }
    ])
    .onSuccess((evt)=>{
        evt.preventDefault();
        let nombre = $("#nombre").val();
        let apellido = $("#apellido").val();
        let correo = $("#correo").val();
        let password = $("#password").val();
        let password1 = $("#password1").val();
        if(password != password1){
            Swal.fire({
                title:"Grappe Shop",
                text:"Las contraseñas no coinciden",
                icon:"error"
            });
            return false;
        }
        $.ajax({
            url:"./adminphp/actualizaPerfil_AX.php",
            type:"POST",
            data:{emailLogin:emailLogin, nombre:nombre, apellido:apellido, correo:correo, password:password},
            cache:false,
            success:(respAX)=>{
                console.log(respAX);
                let objAX = JSON.parse(respAX);
                console.log(objAX);
                if(objAX.cod == 1){
                    localStorage.setItem("emailLogin",correo);
                }
                Swal.fire({
                    title:"Grappe Shop",
                    text:objAX.msj,
                    icon:objAX.icono,
                    didDestroy:()=>{
                        window.location.reload();
                    }
                });
            }
        });
    });
});
