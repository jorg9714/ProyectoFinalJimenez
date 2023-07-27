let racionDiaria = 0;
const ArrayDeProductos = [];
let idUniversal = 1;
const ArrayCart = [];

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

// Juguetes
const juguete1 = new Producto(idUniversal++, "Pelota para Perro", 15000, "Pelota resistente para perros grandes. Perfecta para jugar y ejercitar a tu perro, fabricada con materiales duraderos que soportan el juego agresivo y mordidas.", "Juguetes", "multimedia/images/products/product1.jpg");
ArrayDeProductos.push(juguete1);

const juguete2 = new Producto(idUniversal++, "Ratón de Juguete para Gato", 9999, "Ratón de peluche suave y divertido para gatos. Estimula el instinto de caza de tu gato y proporciona horas de entretenimiento y diversión.", "Juguetes", "multimedia/images/products/product2.jpg");
ArrayDeProductos.push(juguete2);

// Snack
const snack1 = new Producto(idUniversal++, "Hueso Masticable para Perro", 1500, "Delicioso hueso masticable para perros. Ayuda a mantener los dientes y encías saludables, además de ser una excelente opción de premio o recompensa durante el entrenamiento.", "Snack", "multimedia/images/products/product3.jpg");
ArrayDeProductos.push(snack1);

const snack2 = new Producto(idUniversal++, "Premios para Perro", 36000, "Variados premios con diferentes sabores para motivar y recompensar a tu perro. Ideales para el adiestramiento o simplemente como muestra de cariño y gratificación.", "Snack", "multimedia/images/products/product4.jpg");
ArrayDeProductos.push(snack2);

// Comida
const comida1 = new Producto(idUniversal++, "Comida Seca para Gato", 35000, "Alimento completo y balanceado para gatos. Contiene los nutrientes esenciales que tu gato necesita para mantenerse saludable y enérgico. Ideal para gatos de todas las edades.", "Comida", "multimedia/images/products/product5.jpg");
ArrayDeProductos.push(comida1);

const comida2 = new Producto(idUniversal++, "Comida Húmeda para Perro", 150000, "Comida húmeda enlatada para perros de todas las razas. Elaborada con ingredientes de alta calidad y sabores irresistibles, proporcionando una experiencia culinaria deliciosa y nutritiva para tu perro.", "Comida", "multimedia/images/products/product6.jpg");
ArrayDeProductos.push(comida2);

const boxProductElements = document.querySelectorAll('.boxProduct');
ArrayDeProductos.forEach((producto, index) => {
  const boxProductElement = boxProductElements[index];
  const htmlProducto = generarHTMLProducto(producto, index);
  boxProductElement.innerHTML = htmlProducto;

  const addButton = boxProductElement.querySelector('.productButton button');
  addButton.addEventListener('click', () => {
    addToCart(producto.id)
  });
});

function addToCart(productoId) {
  const producto = ArrayDeProductos.find((p) => p.id === productoId);
  const itemEnCarrito = ArrayCart.find((item) => item.producto.id === producto.id);
  if (itemEnCarrito) {
    itemEnCarrito.cantidad++;
  } else {
    ArrayCart.push({ producto: producto, cantidad: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(ArrayCart));
  Swal.fire({
    title: '¡Producto Agregado!',
    text: 'Se ha añadido el producto "' + producto.nombre + '" al carrito.',
    icon: 'success',
    showCancelButton: true,
    confirmButtonText: 'Ver carrito',
    cancelButtonText: 'Seguir comprando',
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = 'pages/cart.html';
    }
  });
}


function generarHTMLProducto(producto, index) {
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
  const resultadoMensaje = isNaN(racionDiaria) ? "Todos los campos son obligatorios" : 'La ración diaria recomendada es: ' + racionDiaria;
  Swal.fire({
    text: resultadoMensaje,
    icon: 'info',
    confirmButtonText: 'Aceptar'
  });
}
// Consumo de API RAZAS de manera asincronica

const apiKey = 'live_h4MSvYMqlJcU4JOg2YXLxZXRFKSWTC9Tcae4dYNDIr3XbYu2pkfnktCe5HhFzU29';
const apiDogUrl = 'https://api.thedogapi.com/v1/breeds'; 
const apiCatUrl = 'https://api.thecatapi.com/v1/breeds'; 

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Función para obtener una raza de perro aleatoria
async function fetchRandomDogBreed() {
  try {
    const response = await fetch(apiDogUrl, {
      headers: {
        'x-api-key': apiKey,
      },
    });
  
    const data = await response.json();
    const randomIndex = getRandomNumber(0, data.length - 1);
    const breedData = {
      name: data[randomIndex].name,
      temperament: data[randomIndex].temperament,
      imageUrl: data[randomIndex].image.url,
    };
  
    return breedData;
  } catch (error) {
    console.error('Error al obtener información del perro:', error);
    throw error;
  }
}

// Función para obtener una raza de gato aleatoria
async function fetchRandomCatBreed() {
  try {
    const response = await fetch(apiCatUrl, {
      headers: {
        'x-api-key': apiKey,
      },
    });
  
    const data = await response.json();
    const randomIndex = getRandomNumber(0, data.length - 1);
    const breedData = {
      name: data[randomIndex].name,
      temperament: data[randomIndex].temperament,
      imageUrl: data[randomIndex].image.url,
    };
  
    return breedData;
  } catch (error) {
    console.error('Error al obtener información del gato:', error);
    throw error;
  }
}

// Función para mostrar el resultado utilizando Swal.fire
function showBreedInfo(breedData,pet) {
  Swal.fire({
    title: `¡Tu Raza de ${pet} del dia es un ${breedData.name} !`,
    text: `Personalidad: ${breedData.temperament}`,
    imageUrl: breedData.imageUrl,
    imageWidth: 200,
    imageHeight: 200,
  });
}

// Event listeners para los botones
document.getElementById('btnConsultarPerro').addEventListener('click', () => {
  fetchRandomDogBreed()
    .then(breedData => {
      showBreedInfo(breedData,"Perro");
    })
    .catch(error => {
      console.error('Error al obtener información del perro:', error);
    });
});

document.getElementById('btnConsultarGato').addEventListener('click', () => {
  fetchRandomCatBreed()
    .then(breedData => {
      showBreedInfo(breedData,"Gato");
    })
    .catch(error => {
      console.error('Error al obtener información del gato:', error);
    });
});



// libreria para Animaciónes  
anime({
  targets: '.sectionInfo h2',
  translateY: [-50, 0],
  opacity: [0, 1],
  duration: 1500,
  easing: 'easeOutExpo'
});


anime({
  targets: '.sectionInfo p',
  translateY: [50, 0],
  opacity: [0, 1],
  duration: 1500,
  delay: 300,
  easing: 'easeOutExpo'
});


anime({
  targets: '.sectionInfo button',
  scale: [0, 1],
  opacity: [0, 1],
  duration: 1000,
  delay: anime.stagger(300),
  easing: 'spring(1, 80, 10, 0)'
});

anime({
  targets: '.boxProduct',
  translateY: [50, 0],
  opacity: [0, 1],
  duration: 1500,
  delay: 300,
  easing: 'easeOutExpo'
});