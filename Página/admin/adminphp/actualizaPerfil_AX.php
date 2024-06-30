<?php
  $emailLogin = $_POST["emailLogin"];
  $nombre = $_POST["nombre"];
  $apellido = $_POST["apellido"];
  $correo = $_POST["correo"];
  $password = password_hash($_POST["password"], PASSWORD_BCRYPT, ['cost' => 12]);

  $conexion = mysqli_connect("localhost","root","","grappe1");
  mysqli_query($conexion, "SET NAMES 'utf8'");
  // Update
  $sql = "UPDATE administrador SET Nombre = '$nombre', Apellidos = '$apellido', Email = '$correo', Contraseña = '$password' WHERE Email = '$emailLogin'";
  $res = mysqli_query($conexion, $sql);
  if($res){
    $respAX["cod"] = 1;
    $respAX["msj"] = "Perfil actualizado correctamente";
    $respAX["data"] = null;
    $respAX["icono"] = "success";
  }
  else{
    $respAX["cod"] = 0;
    $respAX["msj"] = "No se pudo actualizar el perfil";
    $respAX["data"] = null;
    $respAX["icono"] = "error";
  }

  echo json_encode($respAX);
?>