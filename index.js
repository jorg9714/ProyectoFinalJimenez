const OPCION_SALIR = 5;
const costoDelProducto = 8000;
const grPorUnidad = 250;
let mascota;
let racionDiaria = 0;
let edad;
let actividad;
let peso;
const ArrayDeProductos = [];
let idUniversal = 1;

class Producto {
  constructor(id, nombre, precio, descripcion, categoria) {
    this.id = id;
    this.precio = precio;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.categoria = categoria;
  }
}

// Juguetes
const juguete1 = new Producto(idUniversal++, "Pelota para Perro", 15000, "Pelota resistente para perros grandes", "Juguetes");
ArrayDeProductos.push(juguete1);

const juguete2 = new Producto(idUniversal++, "Ratón de Juguete para Gato", 9999, "Ratón de peluche para gatos", "Juguetes");
ArrayDeProductos.push(juguete2);

// Snack
const snack1 = new Producto(idUniversal++, "Hueso Masticable para Perro", 1500, "Delicioso hueso masticable para perros", "Snack");
ArrayDeProductos.push(snack1);

const snack2 = new Producto(idUniversal++, "Premios para Perro", 36000, "Variados premios con diferentes sabores para motivar y recompensar a tu perro", "Snack");
ArrayDeProductos.push(snack2);

// Comida
const comida1 = new Producto(idUniversal++, "Comida Seca para Gato", 35000, "Alimento completo y balanceado para gatos", "Comida");
ArrayDeProductos.push(comida1);

const comida2 = new Producto(idUniversal++, "Comida Húmeda para Perro", 150000, "Comida húmeda enlatada para perros de todas las razas", "Comida");
ArrayDeProductos.push(comida2);

menu();

function menu() {
    alert("Bienvenido a Pets and Stars: Guardería y distribuidora de productos para perros y gatos");
    let opcion = parseInt(prompt('Elige la operación que deseas: \n1- Calcular ración diaria \n2- Mostrar ración diaria \n3- Realizar Cotización \n4- Mostrar Productos \n5- Salir'));
  
    while (opcion !== OPCION_SALIR) {
      switch (opcion) {
        case 1:
          racionDiaria = calcularRacionDiaria();
          alert("La ración diaria recomendada para: \nUn " + mascota + "\nCon un peso aproximado de " + peso + " kg\nEdad de " + edad + " años\nCon una actividad física " + actividad + " es de " + racionDiaria + " gramos.");
          break;
        case 2:
          if (racionDiaria === 0) {
            alert("No tenemos registrado en nuestro sistema un cálculo de ración diaria. Te invitamos a realizar el cálculo de la ración diaria para continuar con la cotización.");
          } else {
            alert("La ración diaria recomendada para: \nUn " + mascota + "\nCon un peso aproximado de " + peso + " kg\nEdad de " + edad + " años\nCon una actividad física " + actividad + " es de " + racionDiaria + " gramos.");
          }
          break;
        case 3:
          realizarCotizacion(racionDiaria);
          break;
        case 4:
          mostrarProductos();
          break;
        default:
          alert('Ingresaste una opción inválida.');
          break;
      }
      opcion = parseInt(prompt('Elige la operación que deseas: \n1- Calcular ración diaria \n2- Mostrar ración diaria \n3- Realizar Cotización \n4- Mostrar Productos \n5- Salir'));
    }
  }
  
  function mostrarProductos() {
    let categoria = prompt('Ingresa la categoría de productos que deseas mostrar (Juguetes, Snack, Comida):');
    mostrarProductosPorCategoria(categoria);
  }
  
  function mostrarProductosPorCategoria(categoria) {
    const productosCategoria = ArrayDeProductos.filter(producto => producto.categoria.toLowerCase() === categoria.toLowerCase());
  
    if (productosCategoria.length === 0) {
      alert("No hay productos disponibles en la categoría especificada.");
    } else {
      alert(`Productos en la categoría ${categoria}:`);
      productosCategoria.forEach(producto => {
        alert(`ID: ${producto.id}\nNombre: ${producto.nombre}\nPrecio: ${producto.precio}\nDescripción: ${producto.descripcion}`);
      });
    }
  }
  
  

function calcularRacionDiaria() {
    mascota = indicarMascota();
    peso = ingresarPeso();
    actividad = indicarFrecuenciaActividadFisica();
    edad = ingresarEdad();

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
    return racionDiaria;
}
function indicarMascota() {
    let mascota;
    while (mascota !== 'Perro' && mascota !== 'Gato') {
        mascota = prompt('Indica qué mascota tienes: \n- Perro \n- Gato');

        switch (mascota) {
            case 'Perro':
                mascota = 'Perro';
                break;
            case 'Gato':
                mascota = 'Gato';
                break;
            default:
                alert('Ingresaste una opción inválida.');
                break;
        }
    }
    return mascota;
}

function ingresarPeso() {
    let peso;
    do {
        peso = parseFloat(prompt('Indica el peso de tu mascota (kg)'));
    } while (isNaN(peso) || peso <= 0);

    return peso;
}

function ingresarEdad() {
    let edad;
    do {
        edad = parseInt(prompt('Indica la edad de tu mascota'));
    } while (isNaN(edad) || !Number.isInteger(edad) || edad <= 0);

    return edad;
}



function indicarFrecuenciaActividadFisica() {
    let frecuenciaActividadFisica = prompt('Indica la actividad física de tu mascota: \n- Sedentaria \n- Moderada \n- Activa');
    while (frecuenciaActividadFisica !== 'Sedentaria' && frecuenciaActividadFisica !== 'Moderada' && frecuenciaActividadFisica !== 'Activa') {
        switch (frecuenciaActividadFisica) {
            case 'Sedentaria':
                frecuenciaActividadFisica = 'Sedentaria';
                break;
            case 'Moderada':
                frecuenciaActividadFisica = 'Moderada';
                break;
            case 'Activa':
                frecuenciaActividadFisica = 'Activa';
                break;
            default:
                alert('Ingresaste una opción inválida en la frecuencia fisica.');
                frecuenciaActividadFisica = prompt('Indica la actividad física de tu mascota: \n- Sedentaria \n- Moderada \n- Activa');
                break;
        }
    }
    return frecuenciaActividadFisica;
}

function realizarCotizacion(racionDiaria) {
    if (racionDiaria === 0) {
        alert("No tenemos registrado en nuestro sistema un cálculo de ración diaria. Te invitamos a realizar el cálculo de la ración diaria para continuar con la cotización.");
        racionDiaria = calcularRacionDiaria();
        alert("La ración diaria recomendada para: \n Un " + mascota + " \n Con un peso aproximado de " + peso + " kg \n Edad de " + edad + " años\n Con una actividad física " + actividad + " es de " + racionDiaria + " gramos.");
        realizarCotizacion(racionDiaria);
    } else {
        alert("Tenemos registrado en nuestro sistema que la ración diaria para tu mascota es de " + racionDiaria + "gr");
        let unidadesNecesarias = Math.ceil(racionDiaria / grPorUnidad);
        alert("Por día necesitas " + unidadesNecesarias + " unidades de nuestro producto, Recuerda que cada unidad contiene " + grPorUnidad + "gr");
        let cantidadUnidades = prompt("Ingrese la cantidad de unidades necesarias (costo por unidad " + costoDelProducto + "COP IVA incluido )");
        if (cantidadUnidades !== null && cantidadUnidades !== "" && cantidadUnidades >= 0 && Number.isInteger(parseFloat(cantidadUnidades))) {
            var costoTotal = cantidadUnidades * costoDelProducto;
            alert("El costo total de " + cantidadUnidades + " unidades es: $" + costoTotal + " COP");
        } else {
            alert("Entrada inválida. Inténtalo de nuevo.");
            realizarCotizacion(racionDiaria);
        }
    }
}

alert('Gracias, ¡vuelve pronto!');
