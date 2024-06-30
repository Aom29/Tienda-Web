document.addEventListener('DOMContentLoaded', function() {
    // Hacer la consulta a la base de datos para obtener los datos del perfil del administrador
    // Datos: Nombre, Apellido, Email
    let emailLogin = localStorage.getItem("emailLogin");
    console.log(emailLogin);
    $.ajax({
        url:"./adminphp/obtenerPerfil_AX.php",
        type:"POST",
        data:{emailLogin:emailLogin},
        cache:false,
        success:(respAX)=>{
            console.log(respAX);
            let objAX = JSON.parse(respAX);
            console.log(objAX);
            // Asignar los valores a los campos del formulario
            $("input#nombre").val(objAX.nombre);
            $("input#apellido").val(objAX.apellido);
            $("input#correo").val(objAX.email);
        }
    });   
});
