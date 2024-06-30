<?php
    // Eliminar cliente de la base de datos
    $id_cliente = $_POST['idCliente'];
    $conexion = mysqli_connect("localhost","root","","grappe1");
    mysqli_query($conexion, "SET NAMES 'utf8'");
    $sql = "DELETE FROM cliente WHERE id_cliente = $id_cliente";
    $res = mysqli_query($conexion, $sql);

    if($res){
        $respAX["cod"] = 1;
        $respAX["msj"] = "Cliente eliminado correctamente";
        $respAX["data"] = null;
        $respAX["icono"] = "success";
    }
    else{
        $respAX["cod"] = 0;
        $respAX["msj"] = "No se pudo eliminar el cliente";
        $respAX["data"] = null;
        $respAX["icono"] = "error";
    }

    echo json_encode($respAX);

?>