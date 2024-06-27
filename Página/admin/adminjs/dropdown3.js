document.addEventListener('DOMContentLoaded', function() {
    const sortSelect = document.getElementById('sort-select-pedidos');
    const tbody = document.querySelector('tbody');

    sortSelect.addEventListener('change', function() {
        const selectedOption = sortSelect.value;
        const rows = Array.from(tbody.querySelectorAll('tr'));

        switch (selectedOption) {
            case 'recent':
                rows.sort((a, b) => {
                    const dateA = new Date(a.querySelector('td[data-label="Period"]').textContent);
                    const dateB = new Date(b.querySelector('td[data-label="Period"]').textContent);
                    return dateB - dateA;
                });
                break;
            case 'oldest':
                rows.sort((a, b) => {
                    const dateA = new Date(a.querySelector('td[data-label="Period"]').textContent);
                    const dateB = new Date(b.querySelector('td[data-label="Period"]').textContent);
                    return dateA - dateB;
                });
                break;
            case 'mayor-precio':
                rows.sort((a, b) => {
                    const priceA = parseFloat(a.querySelector('td[data-label="Due Date"]').textContent.slice(1));
                    const priceB = parseFloat(b.querySelector('td[data-label="Due Date"]').textContent.slice(1));
                    return priceB - priceA;
                });
                break;
            case 'menor-precio':
                rows.sort((a, b) => {
                    const priceA = parseFloat(a.querySelector('td[data-label="Due Date"]').textContent.slice(1));
                    const priceB = parseFloat(b.querySelector('td[data-label="Due Date"]').textContent.slice(1));
                    return priceA - priceB;
                });
                break;
            case 'a-z':
                rows.sort((a, b) => {
                    const textA = a.querySelector('td[data-label="Nombre"]').textContent.trim().toLowerCase();
                    const textB = b.querySelector('td[data-label="Nombre"]').textContent.trim().toLowerCase();
                    return textA.localeCompare(textB);
                });
                break;
            case 'z-a':
                rows.sort((a, b) => {
                    const textA = a.querySelector('td[data-label="Nombre"]').textContent.trim().toLowerCase();
                    const textB = b.querySelector('td[data-label="Nombre"]').textContent.trim().toLowerCase();
                    return textB.localeCompare(textA);
                });
                break;
                case 'no-entregado':
                    function filterPending(rows) {
                        rows.forEach(row => {
                            const status = getStatusValue(row.querySelector('td[data-label="Amount"]'));
                            if (status === 'pending') {
                                row.style.display = '';
                            } else {
                                row.style.display = 'none';
                            }
                        });
                    }
                    break;
                default:
                    break;
            }
    
            // Reinsert sorted rows into tbody
            tbody.innerHTML = '';
            rows.forEach(row => tbody.appendChild(row));
        });

        

        function getStatusValue(td) {
            const statusText = td.textContent.trim().toLowerCase();
            if (statusText.includes('pending')) {
                return 'pending';
            } else if (statusText.includes('dispatch')) {
                return 'dispatch';
            } else {
                return 'delivered'; // You may need to adjust this based on your actual data
            }
        }
    });
