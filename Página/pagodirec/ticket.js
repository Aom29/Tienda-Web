document.addEventListener('DOMContentLoaded', function() {
    const ticketButton = document.querySelector('.ticket');

    if (ticketButton) {
        ticketButton.addEventListener('click', generarTicket);
    }
});

function generarTicket() {
    const productos = [
        { nombre: 'Producto A', precio: 10, cantidad: 2 },
        { nombre: 'Producto B', precio: 15, cantidad: 1 },
        { nombre: 'Producto C', precio: 20, cantidad: 3 }
    ];
    const cliente = "Olivia Wilson";
    const direccionEnvio = "Calle Falsa 123, Ciudad, País";
    const numeroRecibo = "ES-001";
    const fecha = new Date().toLocaleDateString();
    const numeroPedido = "1730/2024";
    const fechaVencimiento = "10/07/2024";
    const formaPago = "Pago se realizará en un plazo de 15 días";

    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });

    let totalGeneral = 0;

    // Título "Ticket de Compra"
    doc.setFontSize(22);
    doc.setTextColor(124, 126, 165); // Color #7c7ea5
    doc.setFont('helvetica', 'bold');
    doc.text('Ticket de Compra', 105, 15, null, null, 'center');

    // Encabezado
    doc.setFontSize(22);
    doc.setTextColor(124, 126, 165); // Color #7c7ea5
    doc.setFont('helvetica', 'bold');
    doc.text('GRAPPE', 20, 40);

    // Información del cliente y número de factura
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    doc.text(`Cliente: ${cliente}`, 20, 50);
    doc.text(`Dirección de envío: ${direccionEnvio}`, 20, 60);
    doc.text(`Factura N°: ${numeroRecibo}`, 150, 50);
    doc.text(`Fecha: ${fecha}`, 150, 60);
    doc.text(`Número de Pedido: ${numeroPedido}`, 20, 70);

    // Tabla de productos
    const headers = [["CANT.", "DESCRIPCIÓN", "PRECIO UNITARIO", "IMPORTE"]];
    const rows = productos.map(producto => {
        const total = producto.precio * producto.cantidad;
        totalGeneral += total;
        return [producto.cantidad, producto.nombre, `$${producto.precio.toFixed(2)}`, `$${total.toFixed(2)}`];
    });

    const themeColors = {
        grid: {
            textColor: [0, 0, 0],
            fontSize: 12,
            fontStyle: 'normal',
            lineWidth: 0.5,
            cellPadding: 2,
            fillColor: [255, 255, 255],
            halign: 'center'
        },
        header: {
            textColor: [255, 255, 255],
            fillColor: [124, 126, 165], // Color #7c7ea5
            fontStyle: 'bold',
            halign: 'center'
        }
    };

    const startY = 90; // Posición inicial de la tabla

    doc.autoTable({
        startY: startY,
        head: headers,
        fontStyle: 'bold',
        body: rows,
        theme: 'grid',
        headStyles: themeColors.header,
        bodyStyles: themeColors.grid,
        margin: { top: 10 },
        themeOptions: {
            tableLineColor: [124, 126, 165]
        }
    });

    // Total General
    doc.setFontSize(18);
    doc.setTextColor(124, 126, 165); // Color #7c7ea5
    doc.setFont('helvetica', 'bold');
    doc.text(`Total General: $${totalGeneral.toFixed(2)}`, 20, doc.autoTable.previous.finalY + 20);

    // Condiciones y forma de pago
    doc.setFontSize(14);
    doc.setTextColor(124, 126, 165); // Color #7c7ea5
    doc.setFont('helvetica', 'bold');
    doc.text('Condiciones y forma de pago', 20, doc.autoTable.previous.finalY + 40);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0); 
    doc.text(formaPago, 20, doc.autoTable.previous.finalY + 50);

    // Pie de página
    // Ajustar márgenes y posición de los bordes de la página completa
    const margin = 10; // Márgenes
    const pageSize = doc.internal.pageSize;
    const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
    const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();

    doc.setDrawColor(124, 126, 165); // Color de los bordes de la página
    doc.setLineWidth(2); 
    doc.line(margin, margin + 10, pageWidth - margin, margin + 10); 
    doc.line(margin, pageHeight - margin - 10, pageWidth - margin, pageHeight - margin - 10); 

    doc.setFontSize(14);
    doc.setTextColor(124, 126, 165); // Color #7c7ea5
    doc.setFont('helvetica', 'bold');
    doc.text('Gracias por su compra', 105, pageHeight - margin - 50, null, null, 'center');
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0); 
    doc.text('Banco Santander', 20, pageHeight - margin - 40); 
    doc.text('IBAN: ES12 3456 7891', 20, pageHeight - margin - 30); 
    doc.text('SWIFT/BIC: ABCDESM1XXX', 20, pageHeight - margin - 20); 

    doc.save('Grappe.pdf');
}
