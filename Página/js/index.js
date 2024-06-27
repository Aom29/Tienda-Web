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
        comprobarCarritoVacio();
    }

    function cargarProductos() {
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

    function insertarCarrito(elemento) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${elemento.imagen}" width=10000></td>
            <td>${elemento.titulo}</td>
            <td>${elemento.precio}</td>
            <td><a href="#" class="borrar" data-id="${elemento.id}">X</a></td>
        `;
        lista.appendChild(row);
        comprobarCarritoVacio();
    }

    function eliminarElemento(e) {
        e.preventDefault();
        if (e.target.classList.contains('borrar')) {
            e.target.parentElement.parentElement.remove();
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
        const row = document.createElement('tr');
        row.id = 'carrito-vacio';
        row.innerHTML = `
            <td colspan="4" style="text-align: center;">
                <p>Aún no tienes elementos en el carrito</p>
                <img src="images/vacio.png" width="100">
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
