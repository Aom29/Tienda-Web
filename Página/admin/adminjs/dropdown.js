            document.addEventListener('click', function(event) {
            var dropdowns = document.querySelectorAll('.dropdown-content');
            dropdowns.forEach(function(dropdown) {
                if (!dropdown.parentElement.contains(event.target)) {
                dropdown.style.display = 'none';
                }
            });
            });

            document.querySelectorAll('.dropbtn').forEach(function(button) {
            button.addEventListener('click', function(event) {
                event.preventDefault();
                event.stopPropagation();
                var dropdown = this.nextElementSibling;
                dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
            });
            });