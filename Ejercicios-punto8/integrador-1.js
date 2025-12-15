/*Ejercicio integrador 1:

Simular un proceso de “consulta de usuario”, que requiere:
1. “Buscar usuario” (promesa de 1 segundo)
2. “Consultar permisos” (promesa de 2 segundos)
3. “Generar reporte final” (promesa de 1 segundo) Realizarlo en tres versiones:
• Con callbacks
• Con promesas
• Con async/await
Meta: identificar ventajas y desventajas reales de cada técnica.*/

//Versión con Callbacks
function buscarUsuario(callback) { // Se define una función que recibe un callback como parámetro
  setTimeout(() => {// Se agenda un temporizador asincrónico de 1 segundo
    console.log("usuario encontrado"); // Se imprime el mensaje cuando vence el temporizador
    callback();// Se ejecuta el callback para continuar con el siguiente proceso
  }, 1000);
}

function consultarPermisos(callback) { // Se define otra función que también recibe un callback
  setTimeout(() => {// Se agenda un temporizador de 2 segundos
    console.log("permisos consultados"); // Se imprime el mensaje cuando vence el temporizador
    callback();// Se ejecuta el callback para continuar con el siguiente proceso
  }, 2000);
}

function generarReporteFinal(callback) { // Se define la tercera función con callback
  setTimeout(() => {// Se agenda un temporizador de 1 segundo
    console.log("reporte final generado"); // Se imprime el mensaje cuando vence el temporizador
    callback();// Se ejecuta el callback final
  }, 1000);
}

// Encadenamiento de callbacks (callback hell)
buscarUsuario(() => { // Se inicia el primer proceso
  consultarPermisos(() => { // Al terminar, se inicia el segundo proceso
    generarReporteFinal(() => { // Al terminar, se inicia el tercer proceso
      console.log("Proceso completado con callbacks");// Mensaje final que indica que todo terminó
    });
  });
});

//Versión con Promesas
function buscarUsuario() { // Se define una función que devuelve una Promesa
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("usuario encontrado"); // Se resuelve la promesa con el mensaje
    }, 1000);
  });
}

function consultarPermisos() { // Se define otra función que devuelve una Promesa
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("permisos consultados"); // Se resuelve la promesa con el mensaje
    }, 2000);
  });
}

function generarReporteFinal() { // Se define la tercera función que devuelve una Promesa
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("reporte final generado");// Se resuelve la promesa con el mensaje
    }, 1000);
  });
}

// Encadenamiento con .then()
buscarUsuario() // Se ejecuta la primera promesa
  .then((usuario) => { // Cuando se resuelve, se recibe el valor
    console.log(usuario); // Se imprime "usuario encontrado"
    return consultarPermisos(); // Se devuelve la segunda promesa
  })
  .then((permisos) => { // Cuando se resuelve la segunda promesa
    console.log(permisos); // Se imprime "permisos consultados"
    return generarReporteFinal(); // Se devuelve la tercera promesa
  })
  .then((reporte) => { // Cuando se resuelve la tercera promesa
    console.log(reporte); // Se imprime "reporte final generado"
    console.log("Proceso completado con promesas"); // Mensaje final
  });

//Versión async/await

function buscarUsuario() { // Se define una función que devuelve una Promesa
  return new Promise((resolve) => {
    setTimeout(() => resolve("usuario encontrado"), 2000); // Se resuelve en 2 segundos
  });
}

function consultarPermisos() { // Se define otra función que devuelve una Promesa
  return new Promise((resolve) => {
    setTimeout(() => resolve("permiso consultado"), 1000); // Se resuelve en 1 segundo
  });
}

function generarReporteFinal() { // Se define la tercera función que devuelve una Promesa
  return new Promise((resolve) => {
    setTimeout(() => resolve("reporte final generado"), 1000); // Se resuelve en 1 segundo
  });
}

async function iniciar() { // Se define una función asincrónica que usa await
  console.log("buscando usuario..."); // Mensaje inicial
  const usuario = await buscarUsuario(); // Se espera a que se resuelva la primera promesa
  console.log(usuario); // Se imprime "usuario encontrado"

  console.log("consultando permiso..."); // Mensaje intermedio
  const permiso = await consultarPermisos(); // Se espera la segunda promesa
  console.log(permiso); // Se imprime "permiso consultado"

  console.log("generando reporte final..."); // Mensaje intermedio
  const reporte = await generarReporteFinal(); // Se espera la tercera promesa
  console.log(reporte); // Se imprime "reporte final generado"
}

iniciar(); // Se ejecuta la función principal