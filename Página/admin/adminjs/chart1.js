

const ctx = document.getElementById('myChart1');

$.ajax({
  url: "./adminphp/obtenerMeses_AX.php",
  type: "POST",
  data: {},
  cache: false,
  success: (respAX) => {
    console.log(respAX);
    let objRespAX = JSON.parse(respAX);
    let cantidades = objRespAX.cantidades;
    let meses = objRespAX.meses;
    // Guardar cantidades como enteros
    cantidades = cantidades.map((c) => parseInt(c));
    console.log(cantidades);
    console.log(meses);

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: meses,
        datasets: [{
          label: 'Productos',
          data: cantidades,
          borderColor: '#7C7EA5',
          backgroundColor: '#7C7EA5',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Compras del añoooo'
          }
        }
      }
    });
  }
});
