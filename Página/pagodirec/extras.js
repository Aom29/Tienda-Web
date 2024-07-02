
              function validarNumeros(input) {
                      // Limpiar el valor de entrada para asegurar que solo sean números
                      input.value = input.value.replace(/\D/g, '');
                  }


//CODIGO POSTAL

  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('cp').addEventListener('input', function() {
      const cp = this.value;

      if (cp.length === 5) { // Asegurarse de que el código postal tenga 5 dígitos
        fetch(`https://api.copomex.com/query/info_cp/${cp}?type=simplified&token=435c308b-d1b3-447e-9a5c-2307b19a75f0`)
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            console.log('Datos recibidos de la API:', data); // Mostrar datos recibidos en la consola
            if (data.response) {
              const addressInfo = data.response;

              // Actualizar los campos del formulario
              if (Array.isArray(addressInfo.asentamiento) && addressInfo.asentamiento.length > 0) {
                document.getElementById('colonia').innerHTML = addressInfo.asentamiento.map(colonia => `<option value="${colonia}">${colonia}</option>`).join('');
              } else {
                console.log('No se encontraron asentamientos válidos.');
              }
              document.getElementById('municipio').value = addressInfo.municipio;
              document.getElementById('estado').value = addressInfo.estado;
              document.getElementById('pais').value = 'México'; // Si la API no proporciona el país, puedes establecerlo manualmente
            } else {
              alert('Código postal no encontrado.');
            }
          })
          .catch(error => {
            console.error('Error al buscar el código postal:', error); // Mostrar error detallado en la consola
            alert('Hubo un problema al buscar el código postal.');
          });
      }
    });
  });

