
let carrito = JSON.parse(localStorage.getItem("cart"));

listarCarritoEnHTML();

function listarCarritoEnHTML() {
  const carritoContainer = document.getElementById("carrito-container");
  carritoContainer.innerHTML = "";
  carrito.forEach((item) => {
    const cartDetail = carrito.find((p) => p.id === item.productoId);
    if (cartDetail) {
      const cantidad = item.cantidad;
      const total = cartDetail.producto.precio * cantidad;
      const itemHTML = `
        <div class="item-carrito">
          <img src="${"../" + item.producto.imagen}" alt="${item.producto.nombre}">
          <h3>${item.producto.nombre}</h3>
          <p>Cantidad: ${cantidad}</p>
          <p>Costo unidad: ${item.producto.precio}
          <p>Total: $${total.toFixed(2)}</p>
        </div>
      `;
      carritoContainer.innerHTML += itemHTML;
    }
  });

  document.getElementById("borrarCarritoButton").addEventListener("click", () => {
    borrarCarrito();
  });

  function borrarCarrito() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará todos los productos del carrito.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.carrito = [];
        localStorage.removeItem("cart");
        location.reload();
        Swal.fire({
          title: 'Carrito eliminado',
          text: 'Se ha eliminado todo el contenido del carrito.',
          icon: 'success',
          timer: 2000,
          timerProgressBar: true,
        });
      }
    });
  }
  
}

