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

    // Marcamos el primer paso como activo
    document.getElementById('Uno').classList.add("active");
    document.getElementById('Dos').classList.remove("active");
    document.getElementById('Tres').classList.remove("active");
    document.getElementById('Cuatro').classList.remove("active");
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
    var steps = document.querySelectorAll(".step");
    steps.forEach(function(step) {
        step.classList.remove("active");
    });

    // Marcamos como activo el paso correspondiente
    document.getElementById(param_div_id + "-step").classList.add("active");
}

// Listener para el botón de cancelar del primer contenedor
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
});

const elements1 = document.querySelectorAll(".one, .two, .three, .four");

elements1.forEach((element1, index) => {
    element1.onclick = function() {
        // Si el elemento clicado es el de Progreso, no hacer nada
        if (index === 3) {
            return;
        }

        // Remueve la clase "active" de todos los elementos
        elements1.forEach(el => el.classList.remove("active"));

        // Agrega la clase "active" al elemento clicado y a todos los anteriores
        for (let i = 0; i <= index; i++) {
            elements1[i].classList.add("active");
        }
    };
});

// Función para marcar el recuadro al continuar
function marcarRecuadro() {
    // Obtener el elemento de Progreso
    const progresoElement = document.querySelector(".four");
    
    // Remover la clase "active" de todos los elementos
    elements1.forEach(el => el.classList.remove("active"));

    // Agregar la clase "active" al elemento de Progreso
    progresoElement.classList.add("active");
}