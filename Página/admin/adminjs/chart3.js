  const cty = document.getElementById('myChart3');

  new Chart(cty, {
    type: 'bar',
    data: {
      labels: ['Producto1', 'Producto2', 'Producto3', 'Producto4', 'Producto5'],
      datasets: [{
        label: 'Unidades vendidas',
        data: [50, 29, 31, 12, 20, 41],
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
          text: (cty) => 'Productos más vendidos',
        }
      }
    }
  });