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
    // CREATE TABLE IF NOT EXISTS `grappe1`.`producto` (
    //     `id_producto` INT NOT NULL AUTO_INCREMENT,
    //     `Nombre` VARCHAR(255) NOT NULL,
    //     `Precio` DECIMAL(15,0) NOT NULL,
    //     `Stock` INT NOT NULL,
    //     `id_categoria` INT NOT NULL,
    //     `Descuento` DECIMAL(10,0) NOT NULL,
    //     `Descripcion` TEXT NOT NULL,
    //     PRIMARY KEY (`id_producto`),
    //     INDEX `id_categoria` (`id_categoria` ASC) VISIBLE)
    //   ENGINE = InnoDB
    //   DEFAULT CHARACTER SET = utf8mb4;

    // Generar cadena con sintaxis de insert en MySQL
    let inserts = "INSERT INTO `producto` (`id_producto`, `Nombre`, `Precio`, `Stock`, `id_categoria`, `Descuento`, `Descripcion`) VALUES \n";
    objProductos.forEach((objeto, indice)=>{
        // Generar fila de tabla
        if(indice == objProductos.length - 1){
            inserts += `(${objeto.id}, "${objeto.title}", ${objeto.price}, ${objeto.stock}, ${idsCategorias.get(objeto.category)}, ${objeto.discountPercentage}, "${objeto.description}");\n`;
            
        }
        else{
            inserts += `(${objeto.id}, "${objeto.title}", ${objeto.price}, ${objeto.stock}, ${idsCategorias.get(objeto.category)}, ${objeto.discountPercentage}, "${objeto.description}"),\n`;
        }
    });
  
    // let verInserts = document.querySelector("div#verInserts");
    // verInserts.innerHTML = inserts;
    console.log(inserts);
  
  });