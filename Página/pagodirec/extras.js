

const elements1 = document.querySelectorAll(".one, .two, .three");

              elements1.forEach((element1, index) => {
                  element1.onclick = function() {
                      // Remueve la clase "active" de todos los elementos
                      elements1.forEach(el => el.classList.remove("active"));
              
                      // Agrega la clase "active" al elemento clicado y a todos los anteriores
                      for (let i = 0; i <= index; i++) {
                          elements1[i].classList.add("active");
                      }
                  };
              });

    
              
              function validarNumeros(input) {
                      // Limpiar el valor de entrada para asegurar que solo sean números
                      input.value = input.value.replace(/\D/g, '');
                  }


//CODIGO POSTAL
