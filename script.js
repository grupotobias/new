document.addEventListener('DOMContentLoaded', loadProducts);

function loadProducts() {
    fetch('api/get_products.php')
        .then(response => response.json())
        .then(products => {
            const tableBody = document.getElementById('product-table-body');
            tableBody.innerHTML = ''; // Limpiar tabla antes de agregar nuevos productos
            products.forEach((product) => {
                addProductToTable(product);
            });
        });
}

function addProductToTable(product) {
    const tableBody = document.getElementById('product-table-body');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.quantity}</td>
        <td>${product.category}</td>
        <td>${product.supplier}</td>
        <td>
            <button class="edit-button" onclick="editProduct(${product.id})">Editar</button>
            <button class="delete-button" onclick="deleteProduct(${product.id})">Eliminar</button>
            <button class="sold-button" onclick="markAsSold(${product.id})">Vendido</button>
        </td>
    `;
    tableBody.appendChild(row);
}

function editProduct(id) {
    // Redirigir o mostrar formulario de edición
}

function deleteProduct(id) {
    fetch(`api/delete_product.php?id=${id}`, { method: 'DELETE' })
        .then(() => loadProducts());
}

function markAsSold(id) {
    fetch(`api/mark_as_sold.php?id=${id}`, { method: 'POST' })
        .then(() => loadProducts());
}

function searchProduct() {
    const searchValue = document.getElementById('search-input').value.toLowerCase();
    fetch(`api/search_products.php?query=${searchValue}`)
        .then(response => response.json())
        .then(products => {
            const tableBody = document.getElementById('product-table-body');
            tableBody.innerHTML = '';
            products.forEach((product) => {
                addProductToTable(product);
            });
        });
}
