let products = [];

// Load products from localStorage or fetch from JSON
async function loadProducts() {
    try {
        // First check localStorage
        const localProducts = localStorage.getItem('adminProducts');
        
        if (localProducts) {
            products = JSON.parse(localProducts);
        } else {
            // Fetch from products.json
            const response = await fetch('products.json');
            if (response.ok) {
                products = await response.json();
                // Save to localStorage
                localStorage.setItem('adminProducts', JSON.stringify(products));
            }
        }
        
        displayProducts();
    } catch (error) {
        console.error('Error loading products:', error);
        showMessage('Error loading products. Make sure products.json exists.', 'error');
    }
}

function displayProducts() {
    const tbody = document.getElementById('productsTableBody');
    
    if (products.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 40px;">No products found. Click "Add New Product" to get started.</td></tr>';
        return;
    }

    tbody.innerHTML = products.map((product, index) => `
        <tr>
            <td><strong>${product.id}</strong></td>
            <td class="emoji-cell">${product.emoji}</td>
            <td>
                <strong>${product.name}</strong><br>
                <small style="color: #666;">${product.description.substring(0, 60)}...</small>
            </td>
            <td style="text-transform: capitalize;">${product.category}</td>
            <td><strong>${product.price}</strong></td>
            <td>${product.badge ? `<span class="badge-cell">${product.badge}</span>` : '-'}</td>
            <td>
                <div class="actions-cell">
                    <button class="btn-edit" onclick="editProduct(${index})">Edit</button>
                    <button class="btn-delete" onclick="deleteProduct(${index})">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function openModal(product = null, index = null) {
    const modal = document.getElementById('productModal');
    const form = document.getElementById('productForm');
    const title = document.getElementById('modalTitle');

    if (product !== null) {
        title.textContent = 'Edit Product';
        document.getElementById('productId').value = product.id;
        document.getElementById('productIndex').value = index;
        document.getElementById('productName').value = product.name;
        document.getElementById('productDescription').value = product.description;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productEmoji').value = product.emoji;
        document.getElementById('productCategory').value = product.category;
        document.getElementById('productBadge').value = product.badge || '';
    } else {
        title.textContent = 'Add New Product';
        form.reset();
        document.getElementById('productId').value = '';
        document.getElementById('productIndex').value = '';
    }

    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('productModal').classList.remove('active');
    document.getElementById('productForm').reset();
}

function saveProduct(event) {
    event.preventDefault();

    const index = document.getElementById('productIndex').value;
    const productData = {
        id: parseInt(document.getElementById('productId').value) || (products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1),
        name: document.getElementById('productName').value,
        description: document.getElementById('productDescription').value,
        price: document.getElementById('productPrice').value,
        emoji: document.getElementById('productEmoji').value,
        category: document.getElementById('productCategory').value,
        badge: document.getElementById('productBadge').value
    };

    if (index !== '') {
        // Edit existing
        products[parseInt(index)] = productData;
        showMessage('Product updated successfully!', 'success');
    } else {
        // Add new
        products.push(productData);
        showMessage('Product added successfully!', 'success');
    }

    // Save to localStorage
    localStorage.setItem('adminProducts', JSON.stringify(products));
    
    closeModal();
    displayProducts();
}

function editProduct(index) {
    openModal(products[index], index);
}

function deleteProduct(index) {
    if (!confirm(`Are you sure you want to delete "${products[index].name}"?`)) return;

    products.splice(index, 1);
    localStorage.setItem('adminProducts', JSON.stringify(products));
    showMessage('Product deleted successfully!', 'success');
    displayProducts();
}

function exportProducts() {
    const dataStr = JSON.stringify(products, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'products.json';
    link.click();
    URL.revokeObjectURL(url);
    showMessage('Products exported! Replace the products.json file on your server.', 'success');
}

function importProducts(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedProducts = JSON.parse(e.target.result);
            products = importedProducts;
            localStorage.setItem('adminProducts', JSON.stringify(products));
            displayProducts();
            showMessage('Products imported successfully!', 'success');
        } catch (error) {
            showMessage('Error importing file. Make sure it\'s a valid JSON file.', 'error');
        }
    };
    reader.readAsText(file);
}

function showMessage(message, type) {
    const container = document.getElementById('messageContainer');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    container.innerHTML = '';
    container.appendChild(messageDiv);

    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Load products on page load
document.addEventListener('DOMContentLoaded', loadProducts);
