document.addEventListener('DOMContentLoaded', function() {
  const sortSelect = document.getElementById('sort-select');
  const tbody = document.querySelector('tbody');

  sortSelect.addEventListener('change', function() {
      const selectedOption = sortSelect.value;
      const rows = Array.from(tbody.querySelectorAll('tr'));

      switch (selectedOption) {
          case 'recent':
              rows.sort((a, b) => {
                  const dateA = new Date(a.querySelector('td[data-label="Account"]').textContent);
                  const dateB = new Date(b.querySelector('td[data-label="Account"]').textContent);
                  return dateB - dateA;
              });
              break;
          case 'oldest':
              rows.sort((a, b) => {
                  const dateA = new Date(a.querySelector('td[data-label="Account"]').textContent);
                  const dateB = new Date(b.querySelector('td[data-label="Account"]').textContent);
                  return dateA - dateB;
              });
              break;
          case 'a-z':
              rows.sort((a, b) => {
                  const textA = a.querySelector('td[data-label="Amount"]').textContent.trim().toLowerCase();
                  const textB = b.querySelector('td[data-label="Amount"]').textContent.trim().toLowerCase();
                  return textA.localeCompare(textB);
              });
              break;
          case 'z-a':
              rows.sort((a, b) => {
                  const textA = a.querySelector('td[data-label="Amount"]').textContent.trim().toLowerCase();
                  const textB = b.querySelector('td[data-label="Amount"]').textContent.trim().toLowerCase();
                  return textB.localeCompare(textA);
              });
              break;
          default:
              break;
      }

      // Reinsert sorted rows into tbody
      tbody.innerHTML = '';
      rows.forEach(row => tbody.appendChild(row));
  });
});
