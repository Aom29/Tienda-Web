<?php

    // Agregra las opciones de categorias con todos los tipos que hay en la base de datos
    /*$.ajax({
        url: "./adminphp/obtenerTodasCategorias_AX.php",
        type: "POST",
        cache: false,
        success: (respAX) => {
            console.log(respAX);
            let objRespAX = JSON.parse(respAX);
            console.log(objRespAX);
            let categorias = objRespAX.categorias;
            let opciones = "";
            categorias.forEach((categoria) => {
                opciones += `<option value="${categoria.Nombre}">${categoria.Nombre}</option>`;
            });
            document.getElementById('categoria').innerHTML += opciones;
        }
    });
    */
    $conexion = mysqli_connect("localhost","root","","grappe1");
    mysqli_query($conexion, "SET NAMES 'utf8'");
    // Select
    $sql = "SELECT * FROM categoria";
    $res = mysqli_query($conexion, $sql);
    $categorias = [];
    while($cat = mysqli_fetch_assoc($res)){
        $categorias[] = $cat;
    }
    $respAX["categorias"] = $categorias;

    echo json_encode($respAX);

?>