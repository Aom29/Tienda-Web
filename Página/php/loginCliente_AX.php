<?php
  $emailLogin = $_POST["emailLogin"];
  $passwordLogin = $_POST["passwordLogin"];

  $conexion = mysqli_connect("localhost","root","","grappe1");
  mysqli_query($conexion, "SET NAMES 'utf8'");
  $sql = "SELECT * FROM cliente WHERE Email = '$emailLogin'";
  $res = mysqli_query($conexion, $sql);
  if(mysqli_num_rows($res) == 1){
    $cliente = mysqli_fetch_assoc($res);
    // if($cliente["Contraseña"] == $passwordLogin){
    if(password_verify($passwordLogin, $cliente["Contraseña"])){
      $respAX["cod"] = 1;
      $respAX["msj"] = "Sesión iniciada correctamente: ";
      $respAX["data"] = $cliente["Nombre"]." ".$cliente["Apellido"];
      $respAX["icono"] = "success";
    }
    else{
      $respAX["cod"] = 0;
      $respAX["msj"] = "La contraseña no es correcta";
      $respAX["data"] = null;
      $respAX["icono"] = "error";
    }
  }else{
    $respAX["cod"] = 0;
    $respAX["msj"] = "El usuario con correo $emailLogin no existe.";
    $respAX["data"] = null;
    $respAX["icono"] = "error";
  }

  echo json_encode($respAX);
?>