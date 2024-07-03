document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();

    const carrito = document.getElementById('carrito');
    const lista = document.querySelector('#lista-carrito tbody');
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

    cargarEventListeners();

    function cargarEventListeners() {
        document.getElementById('lista-1').addEventListener('click', comprarElemento);
        carrito.addEventListener('click', eliminarElemento);
        vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
        document.getElementById('comprar-carrito').addEventListener('click', comprarCarrito);
        lista.addEventListener('click', cambiarCantidad);
        comprobarCarritoVacio();
    }

    function comprarCarrito() {
        window.location.href = 'pagodirec/proceso.html';
    }

    function cargarProductos() {
        fetch('https://dummyjson.com/products?limit=100')
            .then(response => response.json())
            .then(data => {
                const productos = data.products;
                const categorias = obtenerCategorias(productos);
                mostrarCategorias(categorias, productos);
                mostrarOfertas(productos);
                const productosAleatorios = obtenerProductosAleatorios(productos, 12);
                mostrarProductos(productosAleatorios);
            });
    }

    function obtenerCategorias(productos) {
        const categorias = new Set();
        productos.forEach(producto => categorias.add(producto.category));
        return Array.from(categorias);
    }

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
            div.addEventListener('click', () => mostrarProductosPorCategoria(categoria, productos));
            contenedor.appendChild(div);
        });
    }

    function mostrarProductosPorCategoria(categoria, productos) {
        // Filtrar productos por categoría seleccionada
        const productosFiltrados = productos.filter(producto => producto.category === categoria);
    
        // Obtener el contenedor donde se mostrarán los productos
        const productosContainer = document.getElementById('productos-container');
        productosContainer.innerHTML = '';
    
        // Recorrer los productos filtrados y crear elementos HTML para cada uno
        productosFiltrados.forEach(producto => {
            const precioConDescuento = (producto.price * (1 - producto.discountPercentage / 100)).toFixed(2);
    
            // Crear el elemento de producto
            const productoDiv = document.createElement('div');
            productoDiv.classList.add('product');
    
            // Estructura interna del producto
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
    
            // Agregar el producto al contenedor
            productosContainer.appendChild(productoDiv);
        });
    }

    function mostrarOfertas(productos) {
        const contenedor = document.getElementById('ofertas');
        contenedor.innerHTML = '';
        const ofertas = productos.sort((a, b) => b.discountPercentage - a.discountPercentage).slice(0, 3);
        ofertas.forEach(producto => {
            const div = document.createElement('div');
            div.classList.add('ofert-1');
            div.innerHTML = `
                <div class="desco">${producto.discountPercentage}% OFF</div>
                <div class="ofert-img">
                    <img src="${producto.thumbnail}" alt="${producto.title}">
                </div>
                <div class="ofert-txt">
                    <h3>${producto.title}</h3>
                    <a href="#" class="btn-2">Información</a>
                </div>
            `;
            contenedor.appendChild(div);
        });
    }

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
        });
    }

    function crearEstrellas(rating) {
        const maxStars = 5;
        let estrellasHTML = '';
        for (let i = 0; i < maxStars; i++) {
            estrellasHTML += i < rating ? '<span class="star full">★</span>' : '<span class="star">☆</span>';
        }
        return estrellasHTML;
    }

    function comprarElemento(e) {
        e.preventDefault();
        if (e.target.classList.contains('agregar-carrito')) {
            const elemento = e.target.closest('.product');
            leerDatosElemento(elemento);
        }
    }

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

        insertarCarrito(infoElemento);
    }

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

    function eliminarElemento(e) {
        e.preventDefault();
        if (e.target.classList.contains('borrar')) {
            e.target.closest('tr').remove();
            comprobarCarritoVacio();
        }
    }

    function vaciarCarrito() {
        while (lista.firstChild) {
            lista.removeChild(lista.firstChild);
        }
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
