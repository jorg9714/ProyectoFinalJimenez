class Producto {
  constructor(id, nombre, precio, descripcion, categoria, imagen) {
    this.id = id;
    this.precio = precio;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.categoria = categoria;
    this.imagen = imagen;
  }
}

const productos = JSON.parse(localStorage.getItem("cart"))


let carrito = JSON.parse(localStorage.getItem("cart")) || [];

listarCarritoEnHTML(); 

function listarCarritoEnHTML() {
  const carritoContainer = document.getElementById("carrito-container");
  carritoContainer.innerHTML = ""; 
  console.log(carritoContainer);

  carrito.forEach((item) => {
    const cartDetail = productos.find((p) => p.id === item.productoId);
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