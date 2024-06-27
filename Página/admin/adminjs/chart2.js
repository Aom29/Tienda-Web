const ctw = document.getElementById('myChart2');

new Chart(ctw, {
    type: 'pie',
    data: {
        labels: ['Categoria1' , 'Categoria2' , 'Categoria3', 'Categoria4', 'Categoria5','Categoria6'],
        datasets:[{
        label: 'Productos',
        data: [12,19,3,5,2,3],
        borderColor: ['#f7cac9','#7C7EA5','#dec2cb','#9fc5e8','#c5b9cd','#eba5b8'],
        backgroundColor: ['#f7cac9','#7C7EA5','#dec2cb','#9fc5e8','#c5b9cd','#eba5b8'],
        borderWidth: 1
        }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Categorías más vendidas'
        }
      }
    }
  });