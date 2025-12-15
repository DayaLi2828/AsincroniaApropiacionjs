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

function Verificacion(orden,callback) {
  setTimeout(() => {
    console.log(`Orden ${orden.id} verificada - ${orden.cliente}`)
    callback(orden);
  }, 1500);
}

function Procesamiento(orden,callback) {
  setTimeout(() => {
    console.log(`Orden ${orden.id} procesada - ${orden.cliente}`)
    callback(orden);
  }, 2000);
}

function Registro(orden,callback) {
  setTimeout(() => {
    console.log(`Orden ${orden.id} registrada - ${orden.cliente}`)
    callback(orden);
  }, 1000);
}

function Notificación(orden, callback) {
  setTimeout(() => {
    console.log(`Orden ${orden.id} notificada - ${orden.cliente}`)
    callback(orden);
  }, 500);
}

//callback hell
function procesarOrden(orden) {
  Verificacion(orden, (ordenVerificada) => { // Paso 1: Verificación
    Procesamiento(ordenVerificada, (ordenProcesada) => { // Paso 2: Procesamiento
      Registro(ordenProcesada, (ordenRegistrada) => { // Paso 3: Registro
        Notificación(ordenRegistrada, () => { // Paso 4: Notificación
          console.log(`Proceso terminado para orden ${orden.id}\n`); // Mensaje final
        });
      });
    });
  });
}
// Procesar todas las órdenes
for (const orden of ordenes) {
  procesarOrden(orden);
}
