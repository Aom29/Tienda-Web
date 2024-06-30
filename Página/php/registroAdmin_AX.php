<?php
  $nombreRegistro = $_POST["nombreRegistro"];
  $apellidoRegistro = $_POST["apellidoRegistro"];
  $emailRegistro = $_POST["emailRegistro"];
  $passwordRegistro = password_hash($_POST["passwordRegistro"], PASSWORD_BCRYPT, ['cost' => 12]);
  $claveAdmin = $_POST["claveAdmin"];
  $realKey = "12345678"; // Obtener de la base de datos en un futuro

  $conexion = mysqli_connect("localhost","root","","grappe1");
  mysqli_query($conexion, "SET NAMES 'utf8'");
  $sql = "SELECT * FROM administrador WHERE Email = '$emailRegistro'";
  $res = mysqli_query($conexion, $sql);
  if(mysqli_num_rows($res) == 1){
    $administrador = mysqli_fetch_assoc($res);
    $respAX["cod"] = 0;
    $respAX["msj"] = "El correo $emailRegistro ya ha sido utilizado";
    $respAX["icono"] = "error";
  }
  else{
    $sql_insert = "INSERT INTO administrador (Nombre, Apellidos, Email, Contraseña) VALUES ('$nombreRegistro', '$apellidoRegistro', '$emailRegistro', '$passwordRegistro')";
    if($claveAdmin != $realKey){
      $respAX["cod"] = 0;
      $respAX["msj"] = "Clave de administrador incorrecta";
      $respAX["icono"] = "error";
    }
    else{
      if (mysqli_query($conexion, $sql_insert)) {
          $respAX["cod"] = 1;
          $respAX["msj"] = "Te has registrado con éxito $nombreRegistro";
          $respAX["icono"] = "success";
      }
      else {
          $respAX["cod"] = 0;
          $respAX["msj"] = "Error al registrar el administrador: " . mysqli_error($conexion);
          $respAX["icono"] = "error";
      }
    }
  }

  echo json_encode($respAX);
?>