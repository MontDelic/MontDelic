let carrito = [];

function agregarAlCarrito(id, nombre, precio) {
    const producto = carrito.find(item => item.id === id);
    if (producto) {
        producto.cantidad++;
    } else {
        carrito.push({ id, nombre, precio, cantidad: 1 });
    }
    actualizarCarrito();
}

function actualizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    listaCarrito.innerHTML = '';
    let total = 0;

    carrito.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.nombre} - Cantidad: ${item.cantidad} - Precio: $${item.precio * item.cantidad}`;
        listaCarrito.appendChild(li);
        total += item.precio * item.cantidad;
    });

    document.getElementById('total-carrito').textContent = total;
}

function mostrarMensaje(mensaje) {
    // Crear un elemento para mostrar el mensaje
    const mensajeDiv = document.createElement('div');
    mensajeDiv.classList.add('mensaje-agregado');
    mensajeDiv.textContent = mensaje;

    // Insertar el mensaje antes del header
    const header = document.querySelector('header');
    document.body.insertBefore(mensajeDiv, header);

    // Desaparecer el mensaje después de unos segundos
    setTimeout(() => {
        mensajeDiv.remove();
    }, 3000); // Después de 3 segundos (3000 milisegundos)
}

function enviarPedido(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const direccion = document.getElementById('direccion').value;
    
    let mensaje = `Nombre: ${nombre}\nEmail: ${email}\nTeléfono: ${telefono}\nDirección: ${direccion}\n\nPedido:\n`;
    
    carrito.forEach(item => {
        mensaje += `Producto: ${item.nombre} - Cantidad: ${item.cantidad} - Precio: $${item.precio * item.cantidad}\n`;
    });

    const numeroWhatsApp = "18294211217"; // Reemplaza con tu número de WhatsApp en formato internacional, ej. "5215512345678"
    const url = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(mensaje)}`;

    window.open(url, '_blank');
}
