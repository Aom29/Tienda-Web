document.addEventListener("DOMContentLoaded", function () {
    const productosSection = document.getElementById('productos');

    fetch('https://dummyjson.com/products?limit=100')
        .then(response => response.json())
        .then(data => {
            const products = data.products;
            const categories = {};

            products.forEach(product => {
                if (!categories[product.category]) {
                    categories[product.category] = [];
                }
                categories[product.category].push(product);
            });

            for (const category in categories) {
                const categoryContainer = document.createElement('div');
                categoryContainer.className = 'category-container';

                const categoryTitle = document.createElement('h2');
                categoryTitle.className = 'category-title';
                categoryTitle.textContent = category;

                const carousel = document.createElement('div');
                carousel.className = 'carousel';

                categories[category].forEach(product => {
                    const productBox = document.createElement('div');
                    productBox.className = 'box';
                    productBox.innerHTML = `
                        <span class="discount">${product.discountPercentage}%</span>
                        <div class="image">
                            <img src="${product.thumbnail}" alt="${product.title}">
                            <div class="icons">
                                <a href="#" class="fas fa-heart"></a>
                                <a href="#" class="cart-btn">Agregar al carrito</a>
                            </div>
                        </div>
                        <div class="content">
                            <h3>${product.title}</h3>
                            <div class="price">$${product.price}</div>
                        </div>
                    `;
                    productBox.addEventListener('click', () => showProductDetails(product));
                    carousel.appendChild(productBox);
                });

                categoryContainer.appendChild(categoryTitle);
                categoryContainer.appendChild(carousel);
                productosSection.appendChild(categoryContainer);
            }
        })
        .catch(error => console.error('Error fetching products:', error));

    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('close-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalPrice = document.getElementById('modal-price');
    const modalDiscount = document.getElementById('modal-discount');
    const modalRating = document.getElementById('modal-rating');

    function showProductDetails(product) {
        modalImage.src = product.thumbnail;
        modalImage.alt = product.title;
        modalTitle.textContent = product.title;
        modalDescription.textContent = product.description;
        modalPrice.textContent = `Precio: $${product.price}`;
        modalDiscount.textContent = `Descuento: ${product.discountPercentage}%`;
        modalRating.textContent = `Rating: ${product.rating}`;
        modal.style.display = 'block';
    }

    closeModal.onclick = function () {
        modal.style.display = 'none';
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
});
