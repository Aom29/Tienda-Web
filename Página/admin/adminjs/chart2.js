const ctw = document.getElementById('myChart2');

$.ajax({
  url: "./adminphp/obtenerCategorias_AX.php",
  type: "POST",
  data: {},
  cache: false,
  success: (respAX) => {
    console.log(respAX);
    let objRespAX = JSON.parse(respAX);
    let cantidades = objRespAX.cantidades;
    let categorias = objRespAX.categorias;
    // Guardar cantidades como enteros
    cantidades = cantidades.map((c) => parseInt(c));
    console.log(cantidades);
    console.log(categorias);

    new Chart(ctw, {
      type: 'pie',
      data: {
        labels: categorias,
        datasets: [{
          label: 'Productos',
          data: cantidades,
          borderColor: ['#f7cac9', '#7C7EA5', '#dec2cb', '#9fc5e8', '#c5b9cd', '#eba5b8'],
          backgroundColor: ['#f7cac9', '#7C7EA5', '#dec2cb', '#9fc5e8', '#c5b9cd', '#eba5b8'],
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
  }
});

// new Chart(ctw, {
//     type: 'pie',
//     data: {
//         labels: ['Categoria1' , 'Categoria2' , 'Categoria3', 'Categoria4', 'Categoria5','Categoria6'],
//         datasets:[{
//         label: 'Productos',
//         data: [12,19,3,5,2,3],
//         borderColor: ['#f7cac9','#7C7EA5','#dec2cb','#9fc5e8','#c5b9cd','#eba5b8'],
//         backgroundColor: ['#f7cac9','#7C7EA5','#dec2cb','#9fc5e8','#c5b9cd','#eba5b8'],
//         borderWidth: 1
//         }]
//     },
//     options: {
//       responsive: true,
//       plugins: {
//         legend: {
//           position: 'top',
//         },
//         title: {
//           display: true,
//           text: 'Categorías más vendidas'
//         }
//       }
//     }
//   });