document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    const carrito = document.getElementById('carrito');
    const lista = document.querySelector('#lista-carrito tbody');
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
    cargarEventListeners();

    //clics para agregar al carrito, eliminar del carrito, vaciar carrito, comprar, y lo de incremento y decremento
    function cargarEventListeners() {
        document.getElementById('lista-1').addEventListener('click', comprarElemento);
        carrito.addEventListener('click', eliminarElemento);
        vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
        document.getElementById('comprar-carrito').addEventListener('click', comprarCarrito);
        lista.addEventListener('click', cambiarCantidad);
        comprobarCarritoVacio();
    }

    //Aquí, si se van a tomar de la base, sólo se ocupa lo de redirigir a proceso.html
    function comprarCarrito() {
        // Obtener el contenido del carrito desde localStorage
        const carrito = [...lista.querySelectorAll('tr')].map(fila => {
            return {
                imagen: fila.querySelector('img').src,
                titulo: fila.querySelector('td:nth-child(2)').textContent,
                precio: parseFloat(fila.querySelector('.cantidad span').textContent) * parseFloat(fila.querySelector('td:nth-child(3)').lastChild.textContent.replace('$', ''))
            };
        });
    
        // Guardar el contenido del carrito en localStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));
    
        // Redirigir a la página de proceso
        window.location.href = 'pagodirec/proceso.html';
    }
    
    //obtener productos del JSON, de ahí sacamos las categorías, ofertas y los productos aleatorios para "Nuevos productos"
    function cargarProductos() {
        fetch('https://dummyjson.com/products?limit=100')
            .then(response => response.json())
            .then(data => {
                const productos = data.products;
                const categorias = obtenerCategorias(productos);
                mostrarCategorias(categorias, productos);
                mostrarOfertas(productos);
                const productosAleatorios = obtenerProductosAleatorios(productos, 8);
                mostrarProductos(productosAleatorios);
            });
    }

    //Ir agregando los productos correspondientes a cada categoria
    function obtenerCategorias(productos) {
        const categorias = new Set();
        productos.forEach(producto => categorias.add(producto.category));
        return Array.from(categorias);
    }

    //Se muestran las categorias en un carrusel, con nombre (p)
    function mostrarCategorias(categorias, productos) {
        const contenedor = document.getElementById('carousel-categories');
        contenedor.innerHTML = '';
        categorias.forEach(categoria => {
            const div = document.createElement('div');
            div.classList.add('carousel-item');
            div.innerHTML = `
                <img src="inimgs/${categoria}.jpg" alt="${categoria}">
                <p>${categoria}</p>
            `;
            //al dar clic a cada categoria en el carrusel, se muestran los productos que corresponden a esa categoria
            div.addEventListener('click', () => mostrarProductosPorCategoria(categoria, productos));
            contenedor.appendChild(div);
        });
    }

    //Se hace un contenedor de productos y se muestran los productos con sus respectivos detalles
    function mostrarProductosPorCategoria(categoria, productos) {
        const productosFiltrados = productos.filter(producto => producto.category === categoria);
        const productosContainer = document.getElementById('productos-container');
        productosContainer.innerHTML = '';

        productosFiltrados.forEach(producto => {
            //se calcula el precio con descuento para ser mostrado
            const precioConDescuento = (producto.price * (1 - producto.discountPercentage / 100)).toFixed(2);
            const productoDiv = document.createElement('div');
            productoDiv.classList.add('product');

            //Detalles de cada producto, se llama a crearEstrellas para que se muestre la cantidad de estrellas dependiendo el rating
            productoDiv.innerHTML = `
                <div class="desco">${producto.discountPercentage}% OFF</div>
                <img src="${producto.thumbnail}" alt="${producto.title}">
                <div class="product-txt">
                    <h3>${producto.title}</h3>
                    <div class="star-rating">${crearEstrellas(producto.rating)}</div>
                    <p class="precio"><span class="tachado">$${producto.price}</span> $${precioConDescuento}</p>
                    <a href="#" class="agregar-carrito btn-2" data-id="${producto.id}">Agregar al carrito</a>
                </div>
            `;

            productosContainer.appendChild(productoDiv);
            //Eventos de clic para agregar al carrito, y mostrar detalles del producto
            productoDiv.querySelector('.agregar-carrito').addEventListener('click', comprarElemento);
            productoDiv.querySelector('img').addEventListener('click', () => mostrarDetallesProducto(producto));
            productoDiv.querySelector('h3').addEventListener('click', () => mostrarDetallesProducto(producto));
        });
    }

    
    //Se toman y muestran los 3 productos con mayor descuento
    function mostrarOfertas(productos) {
        const contenedor = document.getElementById('ofertas');
        contenedor.innerHTML = '';
        const ofertas = productos.sort((a, b) => b.discountPercentage - a.discountPercentage).slice(0, 3);
        ofertas.forEach(producto => {
            const precioConDescuento = (producto.price * (1 - producto.discountPercentage / 100)).toFixed(2);
            const div = document.createElement('div');
            div.classList.add('product');
            div.innerHTML = `
                <div class="desco">${producto.discountPercentage}% OFF</div>
                <img src="${producto.thumbnail}" alt="${producto.title}">
                <div class="product-txt">
                    <h3>${producto.title}</h3>
                    <div class="star-rating">${crearEstrellas(producto.rating)}</div>
                    <p class="precio"><span class="tachado">$${producto.price}</span> $${precioConDescuento}</p>
                    <a href="#" class="agregar-carrito btn-2" data-id="${producto.id}">Agregar al carrito</a>
                </div>
            `;
            contenedor.appendChild(div);
            //Eventos de clic para agregar al carrito, y mostrar detalles del producto
            div.querySelector('.agregar-carrito').addEventListener('click', comprarElemento);
            div.querySelector('img').addEventListener('click', () => mostrarDetallesProducto(producto));
            div.querySelector('h3').addEventListener('click', () => mostrarDetallesProducto(producto));
        });
    }
    
    /*se generan productos aleatorios para mostrar en "Nuevos productos" 
    Esto se puede cambiar para mostrar los productos que se vayan agregando*/
    function obtenerProductosAleatorios(productos, cantidad) {
        const productosAleatorios = [];
        const copiaProductos = [...productos];

        while (productosAleatorios.length < cantidad && copiaProductos.length > 0) {
            const indiceAleatorio = Math.floor(Math.random() * copiaProductos.length);
            productosAleatorios.push(copiaProductos[indiceAleatorio]);
            copiaProductos.splice(indiceAleatorio, 1);
        }

        return productosAleatorios;
    }

    //Para mostrar los productos que se generaron de forma aleatoria en la funcion anterior
    function mostrarProductos(productos) {
        const contenedor = document.getElementById('product-content');
        contenedor.innerHTML = '';
        productos.forEach(producto => {
            const precioConDescuento = (producto.price * (1 - producto.discountPercentage / 100)).toFixed(2);
            const div = document.createElement('div');
            div.classList.add('product');
            div.innerHTML = `
                <div class="desco">${producto.discountPercentage}% OFF</div>
                <img src="${producto.thumbnail}" alt="${producto.title}">
                <div class="product-txt">
                    <h3>${producto.title}</h3>
                    <div class="star-rating">${crearEstrellas(producto.rating)}</div>
                    <p class="precio"><span class="tachado">$${producto.price}</span> $${precioConDescuento}</p>
                    <a href="#" class="agregar-carrito btn-2" data-id="${producto.id}">Agregar al carrito</a>
                </div>
            `;
            contenedor.appendChild(div);
            div.querySelector('.agregar-carrito').addEventListener('click', comprarElemento);
            div.querySelector('img').addEventListener('click', () => mostrarDetallesProducto(producto));
            div.querySelector('h3').addEventListener('click', () => mostrarDetallesProducto(producto));
        });
    }

    //Para mostrar en otra pagina el producto al que se dio clic (trabajando en eso)
    function mostrarDetallesProducto(producto) {
        localStorage.setItem('productoDetalles', JSON.stringify(producto));
        window.location.href = 'Detalles.html';
    }

    //Genera las estrellas dependiendo del rating del producto
    function crearEstrellas(rating) {
        const maxStars = 5;
        let estrellasHTML = '';
        for (let i = 0; i < maxStars; i++) {
            estrellasHTML += i < rating ? '<span class="star full">★</span>' : '<span class="star">☆</span>';
        }
        return estrellasHTML;
    }

    /*maneja el evento de clic en agregar-carrito, encuentra el contenedor principal del 
    producto asociado (product) manda la información de ese producto a la función leerDatosElemento*/
    function comprarElemento(e) {
        e.preventDefault();
        if (e.target.classList.contains('agregar-carrito')) {
            const elemento = e.target.closest('.product');
            leerDatosElemento(elemento);
        }
    }

    //Lee los datos del producto
    function leerDatosElemento(elemento) {
        const id = elemento.querySelector('.agregar-carrito').getAttribute('data-id');
        const imagen = elemento.querySelector('img').src;
        const titulo = elemento.querySelector('h3').textContent;
        const precioConDescuento = elemento.querySelector('.precio').lastChild.textContent.replace('$', '');
        const precioOriginal = elemento.querySelector('.tachado') ? elemento.querySelector('.tachado').textContent.replace('$', '') : precioConDescuento;

        const infoElemento = {
            id: id,
            imagen: imagen,
            titulo: titulo,
            precioOriginal: parseFloat(precioOriginal),
            precioConDescuento: parseFloat(precioConDescuento)
        };

        //Inserta al carrito el elemento
        insertarCarrito(infoElemento);
    }

    /*Si el producto ya esta en el carro, se sube el contador, si no, 
    se agrega a la tabla del carrito, con todo y cantidad*/
    function insertarCarrito(elemento) {
        const filas = lista.querySelectorAll('tr');
        let elementoExistente = null;

        filas.forEach(fila => {
            const titulo = fila.querySelector('td:nth-child(2)').textContent;
            if (titulo === elemento.titulo) {
                elementoExistente = fila;
            }
        });

        if (elementoExistente) {
            const cantidadSpan = elementoExistente.querySelector('.cantidad span');
            const nuevaCantidad = parseInt(cantidadSpan.textContent) + 1;
            cantidadSpan.textContent = nuevaCantidad;
        } else {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${elemento.imagen}" style="max-width: 100px; height: auto;"></td>
                <td>${elemento.titulo}</td>
                <td>
                    ${elemento.precioOriginal !== elemento.precioConDescuento ? `<span class="tachado-carrito">$${elemento.precioOriginal.toFixed(2)}</span>` : ''}
                    $${elemento.precioConDescuento.toFixed(2)}
                </td>
                <td class="cantidad cantidad-justtop">
                    <button class="decrementar">-</button>
                    <span>1</span>
                    <button class="incrementar">+</button>
                </td>
            `;
            lista.appendChild(row);
        }

        comprobarCarritoVacio();
    }

    //Incremento y decremento de la cantidad de producto en el carrito
    function cambiarCantidad(e) {
        if (e.target.classList.contains('incrementar')) {
            const cantidadSpan = e.target.previousElementSibling;
            cantidadSpan.textContent = parseInt(cantidadSpan.textContent) + 1;
        } else if (e.target.classList.contains('decrementar')) {
            const cantidadSpan = e.target.nextElementSibling;
            const nuevaCantidad = parseInt(cantidadSpan.textContent) - 1;
            if (nuevaCantidad > 0) {
                cantidadSpan.textContent = nuevaCantidad;
            } else {
                e.target.closest('tr').remove();
            }
        }
        comprobarCarritoVacio();
    }

    //Era para la x que salia antes, pero la quite
    function eliminarElemento(e) {
        e.preventDefault();
        if (e.target.classList.contains('borrar')) {
            e.target.closest('tr').remove();
            comprobarCarritoVacio();
        }
    }

    //Funcionamiento del boton de vaciar carrito
    function vaciarCarrito() {
        while (lista.firstChild) {
            lista.removeChild(lista.firstChild);
        }
        comprobarCarritoVacio();
        return false;
    }

    //El carrito está vacío?
    function comprobarCarritoVacio() {
        if (!lista.hasChildNodes()) {   //lo está
            mostrarCarritoVacio();
        } else {
            quitarCarritoVacio();       //no lo está
        }
    }

    //Quita tododslos botones del carrito y sólo imprime que no hay elementos
    function mostrarCarritoVacio() {
        const elementosCarrito = carrito.querySelectorAll(':scope > *:not(#carrito-vacio)');
        elementosCarrito.forEach(elemento => {
            elemento.style.display = 'none';
        });

        let carritoVacio = document.getElementById('carrito-vacio');
        if (!carritoVacio) {
            carritoVacio = document.createElement('div');
            carritoVacio.id = 'carrito-vacio';
            carritoVacio.innerHTML = `
                <p style="color: white; text-align:center">Aún no tienes elementos en el carrito</p>
                <img src="inimgs/vacio.png" width="100px">
            `;
            carrito.appendChild(carritoVacio);
        }
    }

    //si el carrito no está vacío, se muestran los botones y títulos del carrito
    function quitarCarritoVacio() {
        const elementosCarrito = carrito.querySelectorAll(':scope > *');
        elementosCarrito.forEach(elemento => {
            elemento.style.display = 'block';
        });

        const carritoVacio = document.getElementById('carrito-vacio');
        if (carritoVacio) {
            carritoVacio.remove();
        }
    }
});
