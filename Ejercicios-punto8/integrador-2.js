/*Vamos a simular un centro que procesa órdenes de forma asincrónica. Cada orden
requiere pasar por varios pasos: verificación, procesamiento, registro y notificación.
Algunos pasos tardan más tiempo que otros y debemos garantizar que el sistema no se
bloquee. Usaremos callbacks, promesas y async/await dentro del mismo ejercicio para
comparar cómo evoluciona el flujo.
Este ejercicio exige analizar: tiempos, dependencias, orden de ejecución y estructura del
código.*/

const ordenes = [
  { id: 1, cliente: "Ana", monto: 120000 },
  { id: 2, cliente: "Luis", monto: 80000 },
  { id: 3, cliente: "María", monto: 150000 }
];

//Primera parte (Callbacks):

function Verificacion(orden,callback) { // Se define la función de verificación que recibe un callback
  setTimeout(() => { // Se agenda un temporizador asincrónico de 1500 ms
    console.log(`Orden ${orden.id} verificada - ${orden.cliente}`); // Se imprime el mensaje de verificación
    callback(orden); // Se ejecuta el callback para continuar con el siguiente paso
  }, 1500);
}

function Procesamiento(orden,callback) { // Se define la función de procesamiento con callback
  setTimeout(() => { // Temporizador de 2000 ms
    console.log(`Orden ${orden.id} procesada - ${orden.cliente}`); // Se imprime el mensaje de procesamiento
    callback(orden); // Se ejecuta el callback para continuar
  }, 2000);
}

function Registro(orden,callback) { // Se define la función de registro con callback
  setTimeout(() => { // Temporizador de 1000 ms
    console.log(`Orden ${orden.id} registrada - ${orden.cliente}`); // Se imprime el mensaje de registro
    callback(orden); // Se ejecuta el callback para continuar
  }, 1000);
}

function Notificación(orden, callback) { // Se define la función de notificación con callback
  setTimeout(() => { // Temporizador de 500 ms
    console.log(`Orden ${orden.id} notificada - ${orden.cliente}`); // Se imprime el mensaje de notificación
    callback(orden); // Se ejecuta el callback final
  }, 500);
}

//callback hell
function procesarOrden(orden) { // Se define el flujo completo usando callbacks anidados
  Verificacion(orden, (ordenVerificada) => { // Paso 1: Verificación
    Procesamiento(ordenVerificada, (ordenProcesada) => { // Paso 2: Procesamiento
      Registro(ordenProcesada, (ordenRegistrada) => { // Paso 3: Registro
        Notificación(ordenRegistrada, () => { // Paso 4: Notificación
          console.log(`Proceso terminado para orden ${orden.id}\n`); // Mensaje final indicando que todo terminó
        });
      });
    });
  });
}
// Procesar todas las órdenes
for (const orden of ordenes) { // Se recorre el arreglo de órdenes
  procesarOrden(orden); // Se procesa cada orden con callbacks
}

//Segunda parte Promesas:
// Funciones con Promesas
function VerificacionP(orden) { // Se define la función de verificación que devuelve una Promesa
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Orden ${orden.id} verificada - ${orden.cliente}`); // Se imprime el mensaje
      resolve(orden); // Se resuelve la promesa devolviendo la orden
    }, 1500);
  });
}

function ProcesamientoP(orden) { // Se define la función de procesamiento que devuelve una Promesa
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Orden ${orden.id} procesada - ${orden.cliente}`); // Se imprime el mensaje
      resolve(orden); // Se resuelve la promesa devolviendo la orden
    }, 2000);
  });
}

function RegistroP(orden) { // Se define la función de registro que devuelve una Promesa
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Orden ${orden.id} registrada - ${orden.cliente}`); // Se imprime el mensaje
      resolve(orden); // Se resuelve la promesa devolviendo la orden
    }, 1000);
  });
}

function NotificaciónP(orden) { // Se define la función de notificación que devuelve una Promesa
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Orden ${orden.id} notificada - ${orden.cliente}`); // Se imprime el mensaje
      resolve(orden); // Se resuelve la promesa devolviendo la orden
    }, 500);
  });
}

// Encadenamiento con .then()
function procesarOrdenPromesa(orden) { // Se define el flujo completo usando promesas
  VerificacionP(orden)       // Paso 1: Verificación
    .then(ProcesamientoP)    // Paso 2: Procesamiento
    .then(RegistroP)         // Paso 3: Registro
    .then(NotificaciónP)     // Paso 4: Notificación
    .then(() => {
      console.log(`Proceso terminado para orden ${orden.id}\n`); // Mensaje final indicando que todo terminó
    });
}

// Procesar todas las órdenes
for (const orden of ordenes) { // Se recorre el arreglo de órdenes
  procesarOrdenPromesa(orden); // Se procesa cada orden con promesas
}

//Tercera parte Async y await

// Procesar una sola orden con async/await
async function procesarOrdenAsync(orden) { // Se define una función asincrónica para procesar una orden
  const inicio = Date.now(); // Se guarda el tiempo inicial

  await VerificacionP(orden);    // Paso 1: Verificación (espera a que se resuelva la promesa)
  await ProcesamientoP(orden);   // Paso 2: Procesamiento
  await RegistroP(orden);        // Paso 3: Registro
  await NotificaciónP(orden);    // Paso 4: Notificación

  const fin = Date.now(); // Se guarda el tiempo final
  console.log(`Proceso terminado para orden ${orden.id} en ${fin - inicio} ms\n`); // Se imprime la duración total
}

// Procesar todas las órdenes en serie (una detrás de otra)
async function procesarSerie() { // Se define la función para procesar en serie
  console.log("Procesando órdenes en serie..."); // Mensaje inicial
  for (const orden of ordenes) { // Se recorre el arreglo de órdenes
    await procesarOrdenAsync(orden); // Se procesa cada orden esperando a que termine la anterior
  }
}

// Procesar todas las órdenes en paralelo (todas a la vez)
async function procesarParalelo() { // Se define la función para procesar en paralelo
  console.log("Procesando órdenes en paralelo..."); // Mensaje inicial
  await Promise.all(ordenes.map(o => procesarOrdenAsync(o))); // Se procesan todas las órdenes simultáneamente
}

// Ejecutar
procesarSerie();     // Se ejecuta primero en serie
// procesarParalelo(); // Se puede probar luego en paralelo
