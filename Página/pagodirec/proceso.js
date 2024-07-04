window.onload = function() {
    // Elementos de las secciones
    var a = document.getElementById("Direccion");
    var b = document.getElementById("Pago");
    var c = document.getElementById("Confirmar");
    var d = document.getElementById("Progreso");

    // Inicialmente mostramos solo la sección de Dirección
    a.style.display = "block";
    b.style.display = "none";
    c.style.display = "none";
    d.style.display = "none";

    const one = document.querySelector(".one");
    const two = document.querySelector(".two");
    const three = document.querySelector(".three");
    const four = document.querySelector(".four");

    // Marcamos el primer paso como activo
    one.classList.add("active");
    two.classList.remove("active");
    three.classList.remove("active");
    four.classList.remove("active");
}

// Función para mostrar la sección deseada según el parámetro
function show(param_div_id){
    // Elementos de las secciones
    var a = document.getElementById("Direccion");
    var b = document.getElementById("Pago");
    var c = document.getElementById("Confirmar");
    var d = document.getElementById("Progreso");

    // Mostramos la sección correspondiente y ocultamos las demás
    switch(param_div_id) {
        case "Direccion":
            a.style.display = "block";
            b.style.display = "none";
            c.style.display = "none";
            d.style.display = "none";
            break;
        case "Pago":
            a.style.display = "none";
            b.style.display = "block";
            c.style.display = "none";
            d.style.display = "none";
            break;
        case "Confirmar":
            a.style.display = "none";
            b.style.display = "none";
            c.style.display = "block";
            d.style.display = "none";
            break;
        case "Progreso":
            a.style.display = "none";
            b.style.display = "none";
            c.style.display = "none";
            d.style.display = "block";
            break;
        default:
            break;
    }

    // Actualizamos el estado activo de los pasos
    var one = document.querySelector(".one");
    var two = document.querySelector(".two");
    var three = document.querySelector(".three");
    var four = document.querySelector(".four");

    one.classList.add("active");
    if(param_div_id === "Pago") {
        two.classList.add("active");
        three.classList.remove("active");
        four.classList.remove("active");
    } else if(param_div_id === "Confirmar") {
        two.classList.add("active");
        three.classList.add("active");
        four.classList.remove("active");
    } else if(param_div_id === "Progreso") {
        two.classList.add("active");
        three.classList.add("active");
        four.classList.add("active");
    } else {
        two.classList.remove("active");
        three.classList.remove("active");
        four.classList.remove("active");
    }
}

// BOTONES
document.addEventListener('DOMContentLoaded', function() {
    let emailLogin = localStorage.getItem("emailLogin");
    console.log("Email de login: " + emailLogin);
    const cancelButton2 = document.querySelector('.cancel-button2');
    cancelButton2.addEventListener('click', function() {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¿Realmente deseas cancelar?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cancelar',
            cancelButtonText: 'No, volver'
        }).then((result) => {
            if (result.isConfirmed) {
                // Redirigir al index.html
                window.location.href = 'index.html';
            }
        });
    });
    
    const cancelButton = document.querySelector('.cancel-button');
    cancelButton.addEventListener('click', function() {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¿Realmente deseas cancelar?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cancelar',
            cancelButtonText: 'No, volver'
        }).then((result) => {
            if (result.isConfirmed) {
                // Redirigir al index.html
                window.location.href = 'index.html';
            }
        });
    });
    
    const cancelButton3 = document.querySelector('.cancel-button3');
    cancelButton3.addEventListener('click', function() {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¿Realmente deseas cancelar?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cancelar',
            cancelButtonText: 'No, volver'
        }).then((result) => {
            if (result.isConfirmed) {
                // Redirigir al index.html
                window.location.href = 'index.html';
            }
        });
    });
    
    let calle = "";
    let numero = "";
    let colonia = "";
    let cp = "";
    let municipio = "";
    let estado = "";
    let pais = "";

    
    // PUSE ESTO EN LUGAR DEL SAVE-BUTTON
    
    // Detectar cuando se envia el formulario y prevenir el comportamiento por defecto
    const form = document.getElementById('datosCliente');
    form.addEventListener('submit', function(event) {
        // Evitar que se recargue la página
        event.preventDefault();
        // Guardar los valores de los campos en las variables correspondientes
        calle = document.getElementById('calle').value;
        numero = document.getElementById('numero').value;
        colonia = document.getElementById('colonia').value;
        cp = document.getElementById('cp').value;
        municipio = document.getElementById('municipio').value;
        estado = document.getElementById('estado').value;
        pais = document.getElementById('pais').value;
        console.log(calle, numero, colonia, cp, municipio, estado, pais);
        // Mostrar mensaje de éxito
        Swal.fire({
            title: '¡Dirección guardada!',
            text: 'La Dirección ha sido procesado correctamente.',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Mostrar la sección de Pago
                show('Pago');
            }
        });
    });


    // Para el método de pago
    const saveButton3 = document.querySelector('.save-button3');
    saveButton3.addEventListener('click', function() {
        // LLENAR LA PÁGINA DE CONFIRMACIÓN
        // Ajax para obtener los productos del carrito
        url = "./phppago/obtenerCarrito_AX.php";
        $.ajax({
            url:url,
            type: "POST",
            data: {emailLogin:emailLogin},
            cache: false,
            success:(respAX)=>{
                console.log(respAX);
                let objRespAX = JSON.parse(respAX);
                let mensaje = objRespAX.msj;
                let exito = objRespAX.cod;
                if(exito > 0){
                    let productos = objRespAX.productos;
                    let total = objRespAX.total;
                    let totalDescuento = objRespAX.totalDescuento;
                    let totalFinal = objRespAX.totalFinal;
                    let carritoItems = document.querySelector('.carrito-items');
                    carritoItems.innerHTML = "";
                    for(let i = 0; i < productos.length; i++){
                        let producto = productos[i];
                        let divItem = document.createElement("div");
                        divItem.classList.add("carrito-item");
                        divItem.innerHTML = `
                            <span class="carrito-item-titulo">${producto.nombre}</span>
                            <img src="${producto.imagen}" width="80px" alt="">
                            <div class="carrito-item-detalles">
                                
                                <div class="selector-cantidad">
                                    <span class="carrito-item-titulo">Cantidad</span>
                                    <input type="text" value="${producto.cantidad}" class="carrito-item-cantidad" disabled>
                                    <span class="carrito-item-titulo">Precio</span>
                                    <span class="carrito-item-precio">$${producto.precio}</span>
                                </div>
                                
                                
                            </div>
                        `;
                        carritoItems.appendChild(divItem);
                    }

                    // Parte derecha de la página
                    let rightSide = document.querySelector('.right-side');
                    rightSide.innerHTML = `
                        <div class="top-right">
                            <h5>Dirección</h5>
                            <p>${calle} ${numero}, ${colonia}, ${municipio}, ${estado}, ${pais}</p>
                        </div>
                        <div class="bottom-right">
                            <h5>Total</h5>
                            <p class="total-amount">$${total}</p>
                            <div class="discount">
                                <span>- $${- totalDescuento}</span>
                            </div>
                            <h4 class="final-amount">$${totalFinal}</h4>
                        </div>
                    `;
                }
                else{
                    Swal.fire({
                        title: "Error al obtener carrito",
                        text: mensaje,
                        icon: "error",
                    });
                }
            }
        });

        console.log(calle, numero, colonia, cp, municipio, estado, pais);
        Swal.fire({
            title: '¡Método de pago confirmado!',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Mostrar la sección de Confirmar
                show('Confirmar');
            }
        });
    });


    // Listener para el botón de guardar del primer contenedor
    // Para confirmar el pedido
    const saveButton2 = document.querySelector('.save-button2');
    saveButton2.addEventListener('click', function() {

        // Ajax para enviar los datos del pedido
        url = "./phppago/hacerPedidoSaldo_AX.php";
        $.ajax({
            url:url,
            type: "POST",
            data: {
                emailLogin: emailLogin,
                calle: calle,
                numero: numero,
                colonia: colonia,
                municipio: municipio,
                estado: estado,
                cp: cp,
                pais: pais
            },
            cache: false,
            success:(respAX)=>{
                console.log(respAX);
                let objRespAX = JSON.parse(respAX);
                let mensaje = objRespAX.msj;
                let exito = objRespAX.cod;
                if(exito > 0){
                    Swal.fire({
                        title: "Pedido enviado",
                        text: "Tu pedido ha sido enviado correctamente",
                        icon: "success",
                        didDestroy:()=>{
                            show("Progreso");
                        }
                    });
                }
                else{
                    Swal.fire({
                        title: "Error al generar pedido",
                        text: mensaje,
                        icon: "error",
                    });
                }
            }
        });

    });


    // const saveButton2 = document.querySelector('.save-button2');
    // saveButton2.addEventListener('click', function() {
    //     Swal.fire({
    //         title: '¡Pedido realizado con éxito!',
    //         text: 'El pedido ha sido procesado correctamente.',
    //         icon: 'success',
    //         confirmButtonColor: '#3085d6',
    //         confirmButtonText: 'Aceptar'
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             // Mostrar la sección de Progreso
    //             show('Progreso');
    //         }
    //     });
    // });



});

// Función para validar que solo se ingresen números
function validarNumeros(input) {
    input.value = input.value.replace(/[^0-9]/g, '');
}

//OPENMODAL
function openModal() {
            
    document.getElementById('editModal').style.display = "block";
    document.getElementById('editForm').reset();
}

function closeModal() {
    document.getElementById('editModal').style.display = "none";
}

window.onclick = function(event) {
    var modal = document.getElementById('editModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function openModal1() {
            
    document.getElementById('editModal1').style.display = "block";
    document.getElementById('editForm').reset();
}

function closeModal1() {
    document.getElementById('editModal1').style.display = "none";
}

window.onclick = function(event) {
    var modal1 = document.getElementById('editModal1');
    if (event.target == modal1) {
        modal1.style.display = "none";
    }
}

//PONER INFO EN LA TARJETA
document.querySelector('.card-number-input').oninput = () =>{
    document.querySelector('.card-number-box').innerText = document.querySelector('.card-number-input').value;
}

document.querySelector('.card-holder-input').oninput = () =>{
    document.querySelector('.card-holder-name').innerText = document.querySelector('.card-holder-input').value;
}

document.querySelector('.month-input').oninput = () =>{
    document.querySelector('.exp-month').innerText = document.querySelector('.month-input').value;
}

document.querySelector('.year-input').oninput = () =>{
    document.querySelector('.exp-year').innerText = document.querySelector('.year-input').value;
}

document.querySelector('.cvv-input').onmouseenter = () =>{
    document.querySelector('.front1').style.transform = 'perspective(1000px) rotateY(-180deg)';
    document.querySelector('.back').style.transform = 'perspective(1000px) rotateY(0deg)';
}

document.querySelector('.cvv-input').onmouseleave = () =>{
    document.querySelector('.front1').style.transform = 'perspective(1000px) rotateY(0deg)';
    document.querySelector('.back').style.transform = 'perspective(1000px) rotateY(180deg)';
}

document.querySelector('.cvv-input').oninput = () =>{
    document.querySelector('.cvv-box').innerText = document.querySelector('.cvv-input').value;
}