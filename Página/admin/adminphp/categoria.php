<?php
$conexion = mysqli_connect("localhost", "root", "", "grappe1");
mysqli_query($conexion, "SET NAMES 'utf8'");

$query = "SELECT id_categoria, Nombre FROM categoria";
$result = mysqli_query($conexion, $query);

$categorias = [];
while ($row = mysqli_fetch_assoc($result)) {
    $categorias[] = $row;
}

mysqli_close($conexion);

// Devolver las categorías como JSON
header('Content-Type: application/json');
echo json_encode($categorias);
?>
