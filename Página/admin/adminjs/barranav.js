document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.querySelector('.toggle');
    const navigation = document.querySelector('.navigation');
    const main = document.querySelector('.main');
    const list = document.querySelectorAll('.navigation li');

    // Función para guardar la selección actual en localStorage
    function saveSelectedTab() {
        list.forEach((item, index) => {
            if (item.classList.contains('hovered')) {
                localStorage.setItem('selectedTab', index.toString());
            }
        });
    }

    // Función para cargar la selección almacenada en localStorage
    function loadSelectedTab() {
        const selectedTab = localStorage.getItem('selectedTab');
        if (selectedTab !== null) {
            list.forEach((item, index) => {
                if (index === parseInt(selectedTab)) {
                    item.classList.add('hovered');
                } else {
                    item.classList.remove('hovered');
                }
            });
        }
    }

    // Manejo del botón de toggle para la navegación
    toggle.addEventListener('click', function() {
        navigation.classList.toggle('active');
        main.classList.toggle('active');
    });

    // Manejo de los elementos de la lista de navegación
    function activeLink() {
        list.forEach((item) => item.classList.remove('hovered'));
        this.classList.add('hovered');
        saveSelectedTab(); // Guardar la selección actual al pasar el mouse sobre un elemento
    }

    list.forEach((item) => {
        item.addEventListener('mouseover', activeLink);
    });

    // Cargar la selección almacenada al cargar la página
    loadSelectedTab();
});
