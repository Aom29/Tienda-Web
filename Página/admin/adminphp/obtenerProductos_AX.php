<?php
    $filter = $_POST["filter"];
    $buscador = $_POST["buscador"];
/*
    if($filter == "mayor-precio"){
        $sql = "SELECT p.id_producto as 'id_producto', p.Nombre as 'Nombre', p.Descripcion as 'Descripcion', c.Nombre as 'Categoria', p.Precio as 'Precio', p.Stock as 'Stock'
        FROM producto p INNER JOIN categoria c ON p.id_categoria = c.id_categoria ORDER BY p.Precio DESC";
    }
    else if($filter == "menor-precio"){
        $sql = "SELECT p.id_producto as 'id_producto', p.Nombre as 'Nombre', p.Descripcion as 'Descripcion', c.Nombre as 'Categoria', p.Precio as 'Precio', p.Stock as 'Stock'
        FROM producto p INNER JOIN categoria c ON p.id_categoria = c.id_categoria ORDER BY p.Precio ASC";
    }
    else if($filter == "category"){
        $sql = "SELECT p.id_producto as 'id_producto', p.Nombre as 'Nombre', p.Descripcion as 'Descripcion', c.Nombre as 'Categoria', p.Precio as 'Precio', p.Stock as 'Stock'
        FROM producto p INNER JOIN categoria c ON p.id_categoria = c.id_categoria ORDER BY c.Nombre ASC";
    }
    else if($filter == "a-z"){
        $sql = "SELECT p.id_producto as 'id_producto', p.Nombre as 'Nombre', p.Descripcion as 'Descripcion', c.Nombre as 'Categoria', p.Precio as 'Precio', p.Stock as 'Stock'
        FROM producto p INNER JOIN categoria c ON p.id_categoria = c.id_categoria ORDER BY p.Nombre ASC";
    }
    else if($filter == "z-a"){
        $sql = "SELECT p.id_producto as 'id_producto', p.Nombre as 'Nombre', p.Descripcion as 'Descripcion', c.Nombre as 'Categoria', p.Precio as 'Precio', p.Stock as 'Stock'
        FROM producto p INNER JOIN categoria c ON p.id_categoria = c.id_categoria ORDER BY p.Nombre DESC";
    }
    else if($filter == "stock"){
        $sql = "SELECT p.id_producto as 'id_producto', p.Nombre as 'Nombre', p.Descripcion as 'Descripcion', c.Nombre as 'Categoria', p.Precio as 'Precio', p.Stock as 'Stock'
        FROM producto p INNER JOIN categoria c ON p.id_categoria = c.id_categoria ORDER BY p.Stock ASC";
    }
      */  
    if($filter == "mayor-precio"){
        $sql = "SELECT p.id_producto as 'id_producto', p.Nombre as 'Nombre', p.Descripcion as 'Descripcion', c.Nombre as 'Categoria', p.Precio as 'Precio', p.Stock as 'Stock'
        FROM producto p INNER JOIN categoria c ON p.id_categoria = c.id_categoria WHERE p.id_producto LIKE '%$buscador%' OR p.Nombre LIKE '%$buscador%' OR c.Nombre LIKE '%$buscador%' ORDER BY p.Precio DESC";
    }
    else if($filter == "menor-precio"){
        $sql = "SELECT p.id_producto as 'id_producto', p.Nombre as 'Nombre', p.Descripcion as 'Descripcion', c.Nombre as 'Categoria', p.Precio as 'Precio', p.Stock as 'Stock'
        FROM producto p INNER JOIN categoria c ON p.id_categoria = c.id_categoria WHERE p.id_producto LIKE '%$buscador%' OR p.Nombre LIKE '%$buscador%' OR c.Nombre LIKE '%$buscador%' ORDER BY p.Precio ASC";
    }
    else if($filter == "category"){
        $sql = "SELECT p.id_producto as 'id_producto', p.Nombre as 'Nombre', p.Descripcion as 'Descripcion', c.Nombre as 'Categoria', p.Precio as 'Precio', p.Stock as 'Stock'
        FROM producto p INNER JOIN categoria c ON p.id_categoria = c.id_categoria WHERE p.id_producto LIKE '%$buscador%' OR p.Nombre LIKE '%$buscador%' OR c.Nombre LIKE '%$buscador%' ORDER BY c.Nombre ASC";
    }
    else if($filter == "a-z"){
        $sql = "SELECT p.id_producto as 'id_producto', p.Nombre as 'Nombre', p.Descripcion as 'Descripcion', c.Nombre as 'Categoria', p.Precio as 'Precio', p.Stock as 'Stock'
        FROM producto p INNER JOIN categoria c ON p.id_categoria = c.id_categoria WHERE p.id_producto LIKE '%$buscador%' OR p.Nombre LIKE '%$buscador%' OR c.Nombre LIKE '%$buscador%' ORDER BY p.Nombre ASC";
    }
    else if($filter == "z-a"){
        $sql = "SELECT p.id_producto as 'id_producto', p.Nombre as 'Nombre', p.Descripcion as 'Descripcion', c.Nombre as 'Categoria', p.Precio as 'Precio', p.Stock as 'Stock'
        FROM producto p INNER JOIN categoria c ON p.id_categoria = c.id_categoria WHERE p.id_producto LIKE '%$buscador%' OR p.Nombre LIKE '%$buscador%' OR c.Nombre LIKE '%$buscador%' ORDER BY p.Nombre DESC";
    }
    else if($filter == "stock"){
        $sql = "SELECT p.id_producto as 'id_producto', p.Nombre as 'Nombre', p.Descripcion as 'Descripcion', c.Nombre as 'Categoria', p.Precio as 'Precio', p.Stock as 'Stock'
        FROM producto p INNER JOIN categoria c ON p.id_categoria = c.id_categoria WHERE p.id_producto LIKE '%$buscador%' OR p.Nombre LIKE '%$buscador%' OR c.Nombre LIKE '%$buscador%'  ORDER BY p.Stock ASC";
    }

    $conexion = mysqli_connect("localhost", "root", "", "grappe1");
    mysqli_query($conexion, "SET NAMES 'utf8'");
    $res = mysqli_query($conexion, $sql);

    $productos = [];
    while($producto = mysqli_fetch_assoc($res)){
        $productos[] = $producto;
    }

    $respAX = [
        "productos" => $productos
    ];

    echo json_encode($respAX);

?>