
const ctx = document.getElementById('myChart1');

new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Enero' , 'Febrero' , 'Marzo','Abril','Mayo' , 'Junio' , 'Julio',  'Agosto' , 'Septiembre','Octubre' , 'Nociembre' , 'Diciembre'],
        datasets:[{
            label: 'Productos',
            data: [120,301,607,278,415,788,221,567,810,452,156,347],
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
          text: (ctx) => 'Compras del año',
        }
      }
    }
});