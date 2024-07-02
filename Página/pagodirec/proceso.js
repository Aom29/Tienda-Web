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

    const saveButton3 = document.querySelector('.save-button3');
    saveButton3.addEventListener('click', function() {
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
    const saveButton2 = document.querySelector('.save-button2');
    saveButton2.addEventListener('click', function() {
        Swal.fire({
            title: '¡Pedido realizado con éxito!',
            text: 'El pedido ha sido procesado correctamente.',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Mostrar la sección de Progreso
                show('Progreso');
            }
        });
    });

    const saveButton = document.querySelector('.save-button');
    saveButton.addEventListener('click', function() {
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