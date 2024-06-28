document.addEventListener('DOMContentLoaded', function() {
    // Obtener una referencia al botón de generar PDF
    const generatePdfBtn = document.getElementById('generate-pdf-btn');

    // Verificar que el botón exista
    if (generatePdfBtn) {
        // Agregar un evento de clic al botón
        generatePdfBtn.addEventListener('click', loadImageAndGeneratePDF);
    } else {
        console.error('El botón de generar PDF no se encontró en el DOM.');
    }

    function loadImageAndGeneratePDF() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Obtener los canvas de los gráficos de Chart.js
        const canvas1 = document.getElementById('myChart1');
        const canvas2 = document.getElementById('myChart2');
        const canvas3 = document.getElementById('myChart3');

        // Verificar que los canvas existan
        if (canvas1 && canvas2 && canvas3) {
            // Crear clones de los canvas y convertir a imágenes base64
            const canvasImg1 = getCanvasImage(canvas1);
            const canvasImg2 = getCanvasImage(canvas2);
            const canvasImg3 = getCanvasImage(canvas3);

            // Agregar el título en color morado
            doc.setTextColor(124, 126, 165);  // Morado
            doc.setFontSize(30);
            doc.setFont('helvetica', 'bold');
            doc.text('Grappe Shop', 105, 10, { align: 'center' });

            // Agregar el subtítulo en color negro
            doc.setTextColor(0, 0, 0);  // Negro
            doc.setFontSize(11);
            doc.setFont('helvetica', 'normal');
            doc.text('Reporte de ventas', 105, 20, { align: 'center' });

            // Agregar los gráficos al PDF
            doc.addImage(canvasImg1, 'JPEG', 15, 30, 180, 80);
            doc.addImage(canvasImg2, 'JPEG', 55, 115, 100, 100);
            doc.addImage(canvasImg3, 'JPEG', 55, 220, 110, 60);

            // Guardar el documento PDF
            doc.save('GS_reporteVentas.pdf');
        } else {
            console.error('Uno o más canvas no se encontraron en el DOM.');
        }
    }

    // Función para convertir un canvas a imagen base64
    function getCanvasImage(canvas) {
        const clonedCanvas = document.createElement('canvas');
        clonedCanvas.width = canvas.width;
        clonedCanvas.height = canvas.height;
        const clonedCtx = clonedCanvas.getContext('2d');

        // Fondo blanco para el canvas clonado
        clonedCtx.fillStyle = 'white';
        clonedCtx.fillRect(0, 0, clonedCanvas.width, clonedCanvas.height);

        // Dibujar la imagen del canvas original en el canvas clonado
        clonedCtx.drawImage(canvas, 0, 0);

        // Retornar la imagen en formato base64
        return clonedCanvas.toDataURL('image/jpeg', 1.0);
    }
});
