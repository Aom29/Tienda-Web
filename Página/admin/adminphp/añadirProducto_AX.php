<?php
$conexion = mysqli_connect("localhost", "root", "", "grappe1");
mysqli_query($conexion, "SET NAMES 'utf8'");

$response = array(); // Inicializar array para la respuesta

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = mysqli_real_escape_string($conexion, $_POST['nombre']);
    $categoria = mysqli_real_escape_string($conexion, $_POST['categoria']);
    $descripcion = mysqli_real_escape_string($conexion, $_POST['descripcion']);
    $precio = $_POST['precio'];
    $descuento = $_POST['descuento'];
    $stock = $_POST['stock'];
    $disponible = 1; // Cambia esto según tu lógica

    // Manejo de la imagen
    if (isset($_FILES['thumbnail'])) {
        $thumbnail = $_FILES['thumbnail'];
        $uploadDir = 'C:/Users/ivonn/OneDrive/Imágenes/Saved Pictures/'; // Carpeta donde se guardarán las imágenes
        $uploadFile = $uploadDir . basename($thumbnail['name']);

        if (move_uploaded_file($thumbnail['tmp_name'], $uploadFile)) {
            // Insertar datos en la base de datos
            $query = "INSERT INTO producto (Nombre, Precio, Stock, id_categoria, Descuento, Descripcion, Thumbnail, Disponible) 
                      VALUES ('$nombre', '$precio', '$stock', '$categoria', '$descuento', '$descripcion', '$uploadFile', '$disponible')";

            if (mysqli_query($conexion, $query)) {
                // Si se inserta correctamente, responder con un mensaje de éxito
                $response["status"] = 1;
                $response['success'] = true;
                $response["data"] = null;
                $response['message'] = 'Producto agregado correctamente.';
                $response["icono"] = "success";
            } else {
                // Si hay un error, responder con un mensaje de error
                $response["status"] = 0;
                $response['success'] = false;
                $response['message'] = 'Error al agregar el producto: ' . mysqli_error($conexion);
                $response["data"] = null;
                $response["icono"] = "error";
            }
        } else {
            // Error al subir la imagen
            $response['success'] = false;
            $response['message'] = 'Error al subir la imagen.';
        }
    } else {
        // No se recibió la imagen correctamente
        $response['success'] = false;
        $response['message'] = 'No se recibió la imagen correctamente.';
    }

    mysqli_close($conexion);
} else {
    // Método de solicitud incorrecto
    $response['success'] = false;
    $response['message'] = 'Método de solicitud no permitido.';
}

// Devolver respuesta como JSON
echo json_encode($response);
?>
