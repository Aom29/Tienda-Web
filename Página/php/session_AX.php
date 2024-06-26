<?php
  $emailLogin = $_POST["emailLogin"];

  $conexion = mysqli_connect("localhost", "root", "", "grappe1");
  mysqli_query($conexion, "SET NAMES 'utf8'");
  $sql = "SELECT * FROM cliente WHERE Email = '$emailLogin'";
  $res = mysqli_query($conexion, $sql);
  if(mysqli_num_rows($res) == 1){
    $cliente = mysqli_fetch_assoc($res);
    $respAX["cod"] = 1;
    $respAX["msj"] = "¡Bienvenido ".$cliente["Nombre"]."!";
  }else{
    $respAX["cod"] = 0;
    $respAX["msj"] = "No identificado";
  }

  echo json_encode($respAX);
?>