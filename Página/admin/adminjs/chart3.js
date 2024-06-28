const cty = document.getElementById('myChart3');
let myChart = null;

$.ajax({
  url: "./adminphp/obtenerMasVendidos_AX.php",
  type: "POST",
  data: {},
  cache: false,
  success: (respAX) => {
    console.log(respAX);
    let objRespAX = JSON.parse(respAX);
    let cantidades = objRespAX.cantidades;
    let productos = objRespAX.productos;
    // Guardar cantidades como enteros
    cantidades = cantidades.map((c) => parseInt(c));
    console.log(cantidades);
    console.log(productos);

    myChart = new Chart(cty, {
      type: 'bar',
      data: {
        labels: productos,
        datasets: [{
          label: 'Unidades vendidas',
          data: cantidades,
          borderColor: '#a3a4c0',
          backgroundColor: '#a3a4c0',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Productos más vendidos'
          }
        }
      }
    });
  }
});
