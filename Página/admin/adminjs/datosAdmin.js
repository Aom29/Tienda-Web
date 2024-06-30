document.addEventListener('DOMContentLoaded', function() {
    // Obtener de la base los datos: usuarios, ventas, comentarios, ganado
    let usuarios = 0;
    let ventas = 0;
    let comentarios = 0;
    let ganado = 0;
    // Hacer la consulta a la base de datos
    $.ajax({
        url: "./adminphp/obtenerDatosAdmin_AX.php",
        type: "POST",
        data: {},
        cache: false,
        success: (respAX) => {
            console.log(respAX);
            let objRespAX = JSON.parse(respAX);
            console.log(objRespAX);
            usuarios = objRespAX.usuarios;
            ventas = objRespAX.ventas;
            comentarios = objRespAX.comentarios;
            ganado = "$" + objRespAX.ganado;
            console.log(usuarios);
            console.log(ventas);
            console.log(comentarios);
            console.log(ganado);
            // Mostrar los datos en la página
            $("#usuarios").html(usuarios);
            $("#ventas").html(ventas);
            $("#comentarios").html(comentarios);
            $("#ganado").html(ganado);
        }
    });
});
