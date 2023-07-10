


let carrito = JSON.parse(localStorage.getItem("cart"));

listarCarritoEnHTML(); 

function listarCarritoEnHTML() {
  const carritoContainer = document.getElementById("carrito-container");
  carritoContainer.innerHTML = ""; 
  console.log(carritoContainer);

  carrito.forEach((item) => {
    const cartDetail = carrito.find((p) => p.id === item.productoId);
    if (cartDetail) {
     
      console.log(cartDetail)
      const cantidad = item.cantidad;
      const total = cartDetail.producto.precio * cantidad;

      const itemHTML = `
        <div class="item-carrito">
          <img src="${"../"+item.producto.imagen}" alt="${item.producto.nombre}">
          <h3>${item.producto.nombre}</h3>
          <p>Cantidad: ${cantidad}</p>
          <p>Costo unidad: ${item.producto.precio}
          <p>Total: $${total.toFixed(2)}</p>
        </div>
      `;
      carritoContainer.innerHTML += itemHTML;
    }
  });
}