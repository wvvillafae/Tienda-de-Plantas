// Base de Datos de Productos
const productos = [
    {
        id: 1,
        nombre: "Monstera Deliciosa",
        categoria: "Interior",
        descripcion: "Hojas grandes y icónicas. Muy fácil de cuidar.",
        precio: 35.00,
        imagen: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600"
    },
    {
        id: 2,
        nombre: "Lirio de la Paz Blanco",
        categoria: "Floración",
        descripcion: "Elegante planta con flores blancas puras. Ideal para centros de mesa.",
        precio: 30.00,
        imagen: "https://img.freepik.com/fotos-premium/planta-verde-maceta-fondo-blanco_391229-4257.jpg?w=2000"
    },
    {
        id: 3,
        nombre: "Sansevieria Snake",
        categoria: "Resistente",
        descripcion: "Purifica el aire y sobrevive con poca luz.",
        precio: 22.00,
        imagen: "https://img.freepik.com/fotos-premium/planta-maceta-sobre-fondo-blanco_731930-138384.jpg"
    },
    {
       id: 3,
        nombre: "Dracaena Compacta",
        categoria: "Interior / Follaje",
        precio: 45.00,
        descripcion: "Ideal para esquinas con luz moderada.",
        imagen: "https://s3-ap-northeast-1.amazonaws.com/hitohana/spree/products/173037/medium/dracaena-glocal-4_1.jpg?1564739500"
    }
];

let carrito = [];

// Función para mostrar las plantas en el HTML
function cargarCatalogo() {
    const grid = document.getElementById('catalog-grid');
    grid.innerHTML = productos.map(p => `
        <div class="card">
            <img src="${p.imagen}" alt="${p.nombre}">
            <div class="card-body">
                <span class="card-category">${p.categoria}</span>
                <h3 class="card-title">${p.nombre}</h3>
                <p class="card-desc">${p.descripcion}</p>
                <div class="card-footer">
                    <span class="price">$${p.precio.toFixed(2)}</span>
                    <button class="add-btn" onclick="agregarAlCarrito(${p.id})">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Lógica de agregar
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    carrito.push(producto);
    actualizarInterfaz();
}

// Actualizar números y lista del carrito
function actualizarInterfaz() {
    document.getElementById('cart-count').innerText = carrito.length;
    const lista = document.getElementById('cart-items-list');
    let total = 0;

    lista.innerHTML = carrito.map((item, index) => {
        total += item.precio;
        return `
            <div class="cart-item">
                <span>${item.nombre}</span>
                <div>
                    <strong>$${item.precio.toFixed(2)}</strong>
                    <i class="fas fa-trash-alt" onclick="eliminar(${index})" style="color:#ff7675; margin-left:10px; cursor:pointer"></i>
                </div>
            </div>
        `;
    }).join('');

    document.getElementById('total-price').innerText = `$${total.toFixed(2)}`;
}

function eliminar(index) {
    carrito.splice(index, 1);
    actualizarInterfaz();
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = (modal.style.display === 'flex') ? 'none' : 'flex';
}

function checkout() {
    if(carrito.length === 0) return alert("El carrito está vacío");
    alert("¡Compra exitosa! Gracias por elegir Selva Urbana.");
    carrito = [];
    actualizarInterfaz();
    toggleCart();
}

// Iniciar al cargar la página
window.onload = cargarCatalogo;