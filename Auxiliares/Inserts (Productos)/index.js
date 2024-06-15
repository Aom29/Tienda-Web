document.addEventListener("DOMContentLoaded", ()=>{
    let objDatos = JSON.parse(datos);
    let objProductos = objDatos.products;
    let idsCategorias = new Map();
    let categoria_marked = new Map();
    let id = 0;

    console.log(objDatos);
    console.log(objProductos);
    objProductos.forEach((objeto)=>{
        // console.log
        if(!categoria_marked.has(objeto.category)){
            categoria_marked.set(objeto.category, true);
            idsCategorias.set(objeto.category, id++);
        }
    });

    // Imprimir los ids de categorias con su respectiva categoria
    let categoriasString = "Categorias: \n";
    idsCategorias.forEach((value, key)=>{
        categoriasString += `${key} => ${value}\n`;
    });

    console.log(categoriasString);
    // Tabla base
    // CREATE TABLE `producto` (
    //     `id_producto` int(11) NOT NULL,
    //     `Nombre` varchar(255) NOT NULL,
    //     `Precio` int(11) NOT NULL,
    //     `Stock` int(11) NOT NULL,
    //     `id_categoria` int(11) NOT NULL,
    //   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

    // Generar cadena con sintaxis de insert en MySQL
    let inserts = "INSERT INTO `producto` (`id_producto`, `Nombre`, `Precio`, `Stock`, `id_categoria`) VALUES \n";
    objProductos.forEach((objeto, indice)=>{
        // Generar fila de tabla
        if(indice == objProductos.length - 1){
            inserts += `(${objeto.id}, "${objeto.title}", ${objeto.price}, ${objeto.stock}, ${idsCategorias.get(objeto.category)}, "${objeto.description}");\n`;
            
        }
        else{
            inserts += `(${objeto.id}, "${objeto.title}", ${objeto.price}, ${objeto.stock}, ${idsCategorias.get(objeto.category)}, "${objeto.description}"),\n`;
        }
    });
  
    let verInserts = document.querySelector("div#verInserts");
    verInserts.innerHTML = inserts;
    console.log(inserts);
  
  });