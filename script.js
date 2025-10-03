let currentFilter = 'all';

function verifyAge() {
    document.getElementById('ageGate').classList.add('hidden');
    localStorage.setItem('ageVerified', 'true');
    loadProducts();
}

function underAge() {
    alert('You must be at least 19 years old to access this website.');
}

document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('ageVerified') === 'true') {
        document.getElementById('ageGate').classList.add('hidden');
        loadProducts();
    }
    
    const overBtn = document.getElementById('overBtn');
    const underBtn = document.getElementById('underBtn');
    
    if (overBtn) {
        overBtn.addEventListener('click', function(e) {
            e.preventDefault();
            verifyAge();
        });
    }
    
    if (underBtn) {
        underBtn.addEventListener('click', function(e) {
            e.preventDefault();
            underAge();
        });
    }
});

function showPage(page) {
    const pages = document.querySelectorAll('.page-container');
    pages.forEach(p => p.classList.remove('active'));
    
    if (page === 'home') {
        document.getElementById('homePage').classList.add('active');
    } else if (page === 'products') {
        document.getElementById('productsPage').classList.add('active');
        loadProducts();
    } else if (page === 'stockists') {
        document.getElementById('stockistsPage').classList.add('active');
    }
    
    window.scrollTo(0, 0);
    return false;
}

function filterProducts(category) {
    currentFilter = category;
    
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    loadProducts();
}

async function loadProducts() {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; padding: 60px; color: #999;">Loading products...</p>';

    try {
        const response = await fetch('products.json');
        if (!response.ok) throw new Error('Failed to load products.json');
        
        const allProducts = await response.json();

        // Filter products
        const products = currentFilter === 'all' 
            ? allProducts 
            : allProducts.filter(p => p.category === currentFilter);

        productGrid.innerHTML = '';

        if (products.length === 0) {
            productGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; padding: 60px; color: #999;">No products found in this category.</p>';
            return;
        }

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image">
                    ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                    <span style="font-size: 80px;">${product.emoji}</span>
                </div>
                <div class="product-info">
                    <div class="product-category">${product.category || 'General'}</div>
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="product-meta">
                        <div class="price">${product.price}</div>
                        <button class="btn-view-product">View Details</button>
                    </div>
                </div>
            `;
            productGrid.appendChild(productCard);
        });
    } catch (error) {
        console.error('Error loading products:', error);
        productGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; padding: 60px; color: #d32f2f;">Failed to load products. Please make sure products.json file exists in the same folder as index.html</p>';
    }
}