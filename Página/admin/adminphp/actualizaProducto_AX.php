<?php
  
  $idProducto = $_POST['idProducto'];
  $nombre = $_POST['nombre'];
  $categoria = $_POST['categoria'];
  $descripcion = $_POST['descripcion'];
  $precio = $_POST['precio'];
  $descuento = $_POST['descuento'];
  $stock = $_POST['stock'];

  $conexion = mysqli_connect("localhost","root","","grappe1");
  mysqli_query($conexion, "SET NAMES 'utf8'");
  // Obtener el id de la categoria
  $sql = "SELECT id_categoria FROM categoria WHERE Nombre = '$categoria'";
  $res = mysqli_query($conexion, $sql);
  $idCategoria = mysqli_fetch_assoc($res)['id_categoria'];
  // Update
  $sql = "UPDATE producto SET Nombre = '$nombre', Descripcion = '$descripcion', Precio = '$precio', Descuento = '$descuento', Stock = '$stock', id_categoria = '$idCategoria' WHERE id_producto = '$idProducto'";
  $res = mysqli_query($conexion, $sql);

  if($res){
    $respAX["status"] = 1;
    $respAX["msj"] = "Producto actualizado correctamente";
    $respAX["data"] = null;
    $respAX["icono"] = "success";
  }
  else{
    $respAX["status"] = 0;
    $respAX["msj"] = "No se pudo actualizar el producto";
    $respAX["data"] = null;
    $respAX["icono"] = "error";
  }

  echo json_encode($respAX);
?>