let racionDiaria = 0;
const ArrayDeProductos = [];
let idUniversal = 1;
const ArrayCart=[];

class Producto {
  constructor(id, nombre, precio, descripcion, categoria,imagen) {
    this.id = id;
    this.precio = precio;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.categoria = categoria;
    this.imagen=imagen;
  }
}

// Juguetes
const juguete1 = new Producto(idUniversal++, "Pelota para Perro", 15000, "Pelota resistente para perros grandes. Perfecta para jugar y ejercitar a tu perro, fabricada con materiales duraderos que soportan el juego agresivo y mordidas.", "Juguetes","multimedia/images/products/product1.jpg");
ArrayDeProductos.push(juguete1);

const juguete2 = new Producto(idUniversal++, "Ratón de Juguete para Gato", 9999, "Ratón de peluche suave y divertido para gatos. Estimula el instinto de caza de tu gato y proporciona horas de entretenimiento y diversión.", "Juguetes","multimedia/images/products/product2.jpg");
ArrayDeProductos.push(juguete2);

// Snack
const snack1 = new Producto(idUniversal++, "Hueso Masticable para Perro", 1500, "Delicioso hueso masticable para perros. Ayuda a mantener los dientes y encías saludables, además de ser una excelente opción de premio o recompensa durante el entrenamiento.", "Snack","multimedia/images/products/product3.jpg");
ArrayDeProductos.push(snack1);

const snack2 = new Producto(idUniversal++, "Premios para Perro", 36000, "Variados premios con diferentes sabores para motivar y recompensar a tu perro. Ideales para el adiestramiento o simplemente como muestra de cariño y gratificación.", "Snack","multimedia/images/products/product4.jpg");
ArrayDeProductos.push(snack2);

// Comida
const comida1 = new Producto(idUniversal++, "Comida Seca para Gato", 35000, "Alimento completo y balanceado para gatos. Contiene los nutrientes esenciales que tu gato necesita para mantenerse saludable y enérgico. Ideal para gatos de todas las edades.", "Comida","multimedia/images/products/product5.jpg");
ArrayDeProductos.push(comida1);

const comida2 = new Producto(idUniversal++, "Comida Húmeda para Perro", 150000, "Comida húmeda enlatada para perros de todas las razas. Elaborada con ingredientes de alta calidad y sabores irresistibles, proporcionando una experiencia culinaria deliciosa y nutritiva para tu perro.", "Comida","multimedia/images/products/product6.jpg");
ArrayDeProductos.push(comida2);

const boxProductElements = document.querySelectorAll('.boxProduct');
ArrayDeProductos.forEach((producto, index) => {
  const boxProductElement = boxProductElements[index];
  const htmlProducto = generarHTMLProducto(producto,index);
  boxProductElement.innerHTML = htmlProducto;

  const addButton = boxProductElement.querySelector('.productButton button');
  addButton.addEventListener('click', () => {
    addToCart(producto.id)
  });
});

function addToCart(productoId) {
  const producto = ArrayDeProductos.find((p) => p.id === productoId);
  if (producto) {
    const itemEnCarrito = ArrayCart.find((item) => item.producto.id === producto.id);
    if (itemEnCarrito) {
      itemEnCarrito.cantidad++;
    } else {
      ArrayCart.push({ producto: producto, cantidad: 1 });
    }
    console.log(`Producto agregado al carrito: ${producto.nombre}`);
    localStorage.setItem("cart", JSON.stringify(ArrayCart));
  } else {
    console.log("El producto no existe");
  }
}


function generarHTMLProducto(producto,index) {
  const html = `
        <div class="productName">
            <h3>${producto.nombre}</h3>
        </div>
        <div class="iconStar">
            <img src="multimedia/icons/starIcon.png" alt="">
        </div>
        <div class="imgfeature">
            <img src="${producto.imagen}" alt="">
        </div>
        <div class="productPrice">
            <h4>Precio: $${producto.precio}</h4>
        </div>
        <div class="productDescription">
            <p>${producto.descripcion}</p>
        </div>
        <div class="productButton">
            <button>Agregar al carrito</button>
        </div>
  `;
  return html;
}


function calcularRacionDiaria() {
  const mascotaElemento = document.getElementById('mascota');
  const pesoElemento = document.getElementById('peso');
  const actividadElemento = document.getElementById('actividad');
  const edadElemento = document.getElementById('edad');

  const mascota = mascotaElemento.value;
  const peso = parseFloat(pesoElemento.value);
  const actividad = actividadElemento.value;
  const edad = parseInt(edadElemento.value);

    switch (actividad) {
        case 'Sedentaria':
            if (mascota == 'Perro') {
                racionDiaria = (peso * 0.35 + (peso * edad / 10)) * 25;
            } else {
                racionDiaria = (peso * 0.35 + (peso * edad / 10)) * 15;
            }
            break;
        case 'Moderada':
            if (mascota == 'Perro') {
                racionDiaria = (peso * 0.4 + (peso * edad / 10)) * 25;
            } else {
                racionDiaria = (peso * 0.4 + (peso * edad / 10)) * 15;
            }
            break;
        case 'Activa':
            if (mascota == 'Perro') {
                racionDiaria = (peso * 0.5 + (peso * edad / 10)) * 25;
            } else {
                racionDiaria = (peso * 0.5 + (peso * edad / 10)) * 15;
            }
            break;
    }
    mostrarResultado(racionDiaria);
    
}
function mostrarResultado(racionDiaria) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  const contenido = document.createElement('div');
  contenido.className = 'modal-content';
  const resultadoElemento = document.createElement('p');
  resultadoElemento.textContent = isNaN(racionDiaria) ? "Todos los campos son obligatorios" : 'La ración diaria recomendada es: ' + racionDiaria;
  contenido.appendChild(resultadoElemento);
  modal.appendChild(contenido);
  document.body.appendChild(modal);
  window.addEventListener('click', function (event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
}
//alert('Gracias, ¡vuelve pronto!');
