document.addEventListener("DOMContentLoaded", ()=>{
    let objDatos = JSON.parse(datos);
    let objProductos = objDatos.products;
    let idsCategorias = new Map();
    let categoria_marked = new Map();
    let id = 0;

    console.log(objDatos);
    console.log(objProductos);
    objProductos.forEach((objeto)=>{
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
    // CREATE TABLE IF NOT EXISTS `grappe1`.`categoria` (
    //     `id_categoria` INT NOT NULL AUTO_INCREMENT,
    //     `Nombre` VARCHAR(100) NOT NULL,
    //     `Descripcion` TEXT NOT NULL,
    //     PRIMARY KEY (`id_categoria`))
    //   ENGINE = InnoDB
    //   DEFAULT CHARACTER SET = utf8mb4;

    // Generar cadena con sintaxis de insert en MySQL
    let inserts = "INSERT INTO `categoria` (`id_categoria`, `Nombre`, `Descripcion`) VALUES \n";
    idsCategorias.forEach((value, key)=>{
            inserts += `(${value}, "${key}", "Hola"),\n`;
    });
    // let verInserts = document.querySelector("div#verInserts");
    // verInserts.innerHTML = inserts;
    console.log(inserts);
  
  });