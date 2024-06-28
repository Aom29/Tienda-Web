document.addEventListener('DOMContentLoaded', () => {
    // cargarProductos();
    mostrarProductosBase();

    const carrito = document.getElementById('carrito');
    const lista = document.querySelector('#lista-carrito tbody');
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
    
    llenarCarritoBase();
    cargarEventListeners();
    
    function cargarEventListeners() {
        document.getElementById('lista-1').addEventListener('click', comprarElemento);
        carrito.addEventListener('click', eliminarElemento);
        vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
        comprobarCarritoVacio();
    }
    
    function cargarProductos() {
        // Aquí es donde haré la consulta a la base de datos
        fetch('https://dummyjson.com/products?limit=100')
        .then(response => response.json())
        .then(data => mostrarProductos(data.products));
    }

    function mostrarProductos(productos) {
        const contenedor = document.getElementById('product-content');
        productos.forEach(producto => {
            const div = document.createElement('div');
            div.classList.add('product');
            div.innerHTML = `
            <img src="${producto.thumbnail}" alt="${producto.title}">
            <div class="product-txt">
            <h3>${producto.title}</h3>
            <p>${producto.description}</p>
            <p class="precio">$${producto.price}</p>
            <a href="#" class="agregar-carrito btn-2" data-id="${producto.id}">Agregar al carrito</a>
            </div>
            `;
            contenedor.appendChild(div);
        });
    }

    function mostrarProductosBase(){
        let emailLogin = sessionStorage.getItem("emailLogin");
        $.ajax({
            url:"./php/mostrarProductos_AX.php",
            type:"POST",
            data:{emailLogin:emailLogin},
            cache:false,
            success:(respAX)=>{
                // console.log(respAX);
                let objRespAX = JSON.parse(respAX);
                let productos = objRespAX.productos;
                // console.log(productos);
                productos.forEach(producto => {
                    const div = document.createElement('div');
                    div.classList.add('product');
                    div.innerHTML = `
                    <img src="${producto.Thumbnail}" alt="${producto.Nombre}">
                    <div class="product-txt">
                    <h3>${producto.Nombre}</h3>
                    <p>${producto.Descripcion}</p>
                    <p class="precio">$${producto.Precio}</p>
                    <a href="#" class="agregar-carrito btn-2" data-id="${producto.id_producto}">Agregar al carrito</a>
                    </div>
                    `;
                    document.getElementById('product-content').appendChild(div);
                });
            }
        });
    }
    
    function comprarElemento(e) {
        e.preventDefault();
        if (e.target.classList.contains('agregar-carrito')) {
            const elemento = e.target.parentElement.parentElement;
            leerDatosElemento(elemento);
        }
    }
    
    function leerDatosElemento(elemento) {
        const infoElemento = {
            imagen: elemento.querySelector('img').src,
            titulo: elemento.querySelector('h3').textContent,
            precio: elemento.querySelector('.precio').textContent,
            id: elemento.querySelector('a').getAttribute('data-id')
        };
        insertarCarrito(infoElemento);
    }

    function llenarCarritoBase() {
        let emailLogin = sessionStorage.getItem("emailLogin");
        $.ajax({
            url:"./php/llenarCarrito_AX.php",
            type:"POST",
            data:{emailLogin:emailLogin},
            cache:false,
            success:(respAX)=>{
                // console.log(respAX);
                let objRespAX = JSON.parse(respAX);
                let productos = objRespAX.productos;
                // console.log(productos);
                productos.forEach(producto => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                    <td><img src="${producto.Thumbnail}" width=10000></td>
                    <td>${producto.Nombre}</td>
                    <td>${producto.Precio}</td>
                    <td><a href="#" class="borrar" data-id="${producto.id_producto}">X</a></td>
                    `;
                    lista.appendChild(row);
                });
            }
        });
        comprobarCarritoVacio();
    }
    
    function insertarCarrito(elemento) {
        // Insertar en la base
        let emailLogin = sessionStorage.getItem("emailLogin");
        let idProducto = elemento.id;
        $.ajax({
            url:"./php/insertarCarrito_AX.php",
            type:"POST",
            data:{emailLogin:emailLogin, idProducto:idProducto},
            cache:false,
            success:(respAX)=>{
                console.log(respAX);
                let objRespAX = JSON.parse(respAX);
                let exito = objRespAX.cod;
                //console.log(objRespAX.cod)
                //console.log(objRespAX.mensaje);
                const row = document.createElement('tr');
                row.innerHTML = `
                <td><img src="${elemento.imagen}" width=10000></td>
                <td>${elemento.titulo}</td>
                <td>${elemento.precio}</td>
                <td><a href="#" class="borrar" data-id="${elemento.id}">X</a></td>
                `;
                console.log("Exito = " + exito);
                if(exito == 1){
                    lista.appendChild(row);
                }
            }
        });
        comprobarCarritoVacio();
    }
    
    function eliminarElemento(e) {
        e.preventDefault();
        if (e.target.classList.contains('borrar')) {
            console.log(e.target.getAttribute('data-id'));
            // Eliminar de la base de datos el elemento con el id correspondiente
            let emailLogin = sessionStorage.getItem("emailLogin");
            let idProducto = e.target.getAttribute('data-id');
            $.ajax({
                url:"./php/eliminarElementoCarrito_AX.php",
                type:"POST",
                data:{emailLogin:emailLogin, idProducto:idProducto},
                cache:false,
                success:(respAX)=>{
                    console.log(respAX);
                    let objRespAX = JSON.parse(respAX);
                    console.log(objRespAX.mensaje);
                }
            });
            e.target.parentElement.parentElement.remove();
            comprobarCarritoVacio();
        }
    }
    
    function vaciarCarrito() {
        // En paralelo, en la base, eliminar los elementos del carrito
        while (lista.firstChild) {
            lista.removeChild(lista.firstChild);
        }
        if(!sessionStorage.getItem("emailLogin")){
            // $("a#nombreUsuario").text("No identificado");
        }
        let emailLogin = sessionStorage.getItem("emailLogin");
        $.ajax({
            url:"./php/vaciarCarrito_AX.php",
            type:"POST",
            data:{emailLogin:emailLogin},
            cache:false,
            success:(respAX)=>{
                //console.log(respAX);
                let objRespAX = JSON.parse(respAX);
                console.log(objRespAX.mensaje);
            }
        });
        comprobarCarritoVacio();

        return false;
    }

    function comprobarCarritoVacio() {
        if (!lista.hasChildNodes()) {
            mostrarCarritoVacio();
        } else {
            quitarCarritoVacio();
        }
    }

    function mostrarCarritoVacio() {
        const row = document.createElement('tr');
        row.id = 'carrito-vacio';
        row.innerHTML = `
            <td colspan="4" style="text-align: center;">
                <p>Aún no tienes elementos en el carrito</p>
                <img src="./inimgs/vacio.png" width="100">
            </td>
        `;
        lista.appendChild(row);
    }

    function quitarCarritoVacio() {
        const carritoVacio = document.getElementById('carrito-vacio');
        if (carritoVacio) {
            carritoVacio.remove();
        }
    }
});
