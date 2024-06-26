<?php
  $nombreRegistro = $_POST["nombreRegistro"];
  $apellidoRegistro = $_POST["apellidoRegistro"];
  $emailRegistro = $_POST["emailRegistro"];
  $passwordRegistro = password_hash($_POST["passwordRegistro"], PASSWORD_BCRYPT, ['cost' => 12]);

  $conexion = mysqli_connect("localhost","root","","grappe1");
  mysqli_query($conexion, "SET NAMES 'utf8'");
  $sql = "SELECT * FROM cliente WHERE Email = '$emailRegistro'";
  $res = mysqli_query($conexion, $sql);
  if(mysqli_num_rows($res) == 1){
    $cliente = mysqli_fetch_assoc($res);
    $respAX["cod"] = 0;
    $respAX["msj"] = "El correo $emailRegistro ya ha sido utilizado";
    $respAX["icono"] = "error";
  }
  else{
    $sql_insert = "INSERT INTO cliente (Nombre, Apellido, Email, Contraseña, Saldo) VALUES ('$nombreRegistro', '$apellidoRegistro', '$emailRegistro', '$passwordRegistro', 10000)";

    if (mysqli_query($conexion, $sql_insert)) {
        $respAX["cod"] = 1;
        $respAX["msj"] = "Te has registrado con éxito $nombreRegistro";
        $respAX["icono"] = "success";
    }
    else {
        $respAX["cod"] = 0;
        $respAX["msj"] = "Error al registrar el cliente: " . mysqli_error($conexion);
        $respAX["icono"] = "error";
    }
  }

  echo json_encode($respAX);
?>