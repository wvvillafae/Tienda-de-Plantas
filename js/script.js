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
        id: 4,
        nombre: "Dracaena Compacta",
        categoria: "Interior / Follaje",
        precio: 45.00,
        descripcion: "Ideal para esquinas con luz moderada.",
        imagen: "https://s3-ap-northeast-1.amazonaws.com/hitohana/spree/products/173037/medium/dracaena-glocal-4_1.jpg?1564739500"
    }
];

let carrito = [];

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

// Lógica de agregar con CANTIDAD
function agregarAlCarrito(id) {
    const existe = carrito.find(p => p.id === id);
    if (existe) {
        existe.cantidad++;
    } else {
        const productoOriginal = productos.find(p => p.id === id);
        carrito.push({ ...productoOriginal, cantidad: 1 });
    }
    actualizarInterfaz();
}

// Funciones para cambiar cantidad desde el carrito
function cambiarCantidad(index, cambio) {
    carrito[index].cantidad += cambio;
    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
    }
    actualizarInterfaz();
}

function eliminar(index) {
    carrito.splice(index, 1);
    actualizarInterfaz();
}

// Actualizar interfaz con MINIATURAS y SELECTOR DE CANTIDAD
function actualizarInterfaz() {
    const totalItems = carrito.reduce((acc, p) => acc + p.cantidad, 0);
    document.getElementById('cart-count').innerText = totalItems;

    const lista = document.getElementById('cart-items-list');
    let totalPrecio = 0;

    lista.innerHTML = carrito.map((item, index) => {
        const subtotal = item.precio * item.cantidad;
        totalPrecio += subtotal;
        
        return `
            <div class="cart-item" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <img src="${item.imagen}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 8px;">
                    <div>
                        <div style="font-weight: 600; font-size: 0.9rem;">${item.nombre}</div>
                        <div style="display: flex; align-items: center; gap: 8px; margin-top: 5px;">
                            <button onclick="cambiarCantidad(${index}, -1)" style="border: 1px solid #ddd; background: white; cursor: pointer; padding: 0 6px; border-radius: 4px;">-</button>
                            <span style="font-size: 0.85rem; font-weight: bold;">x${item.cantidad}</span>
                            <button onclick="cambiarCantidad(${index}, 1)" style="border: 1px solid #ddd; background: white; cursor: pointer; padding: 0 6px; border-radius: 4px;">+</button>
                            <span style="font-size: 0.8rem; color: #888; margin-left: 5px;">($${item.precio.toFixed(2)} c/u)</span>
                        </div>
                    </div>
                </div>
                <div style="text-align: right;">
                    <div style="font-weight: bold; margin-bottom: 5px;">$${subtotal.toFixed(2)}</div>
                    <i class="fas fa-trash-alt" onclick="eliminar(${index})" style="color:#ff7675; cursor:pointer; font-size: 0.9rem;"></i>
                </div>
            </div>
        `;
    }).join('');

    document.getElementById('total-price').innerText = `$${totalPrecio.toFixed(2)}`;
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

window.onload = cargarCatalogo;