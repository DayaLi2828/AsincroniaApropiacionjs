/*Ejercicio integrador 3:
Simulador de Consulta de Usuarios y Roles

Descripción general:
Se simula una aplicación que consulta información desde diferentes fuentes:
- Datos básicos del usuario
- Información de seguridad
- Roles y permisos
Cada consulta tiene un tiempo distinto. El objetivo es reconstruir el flujo completo,
validar que la aplicación no se bloquee y comprender el orden real de los resultados.
*/

// Datos de entrada
const usuarios = [101, 102, 103, 104]; // Arreglo de IDs de usuarios

// Tiempos simulados
// Consulta de usuario: 1200 ms
// Consulta de seguridad: 800 ms
// Consulta de roles: 2000 ms
// Registro final: 600 ms


// 1. Versión bloqueante (demostración)

function versionBloqueante() { // Se define una función que simula operaciones largas de forma sincrónica
  console.log("Iniciando versión bloqueante...");
  const inicio = Date.now(); // Se guarda el tiempo inicial
  for (let usuario of usuarios) { // Se recorre cada usuario
    let fin = Date.now() + 1200; // Se simula consulta de usuario con espera activa
    while (Date.now() < fin) {} // Bucle que bloquea el programa
    
    fin = Date.now() + 800; // Se simula consulta de seguridad
    while (Date.now() < fin) {}
    
    fin = Date.now() + 2000; // Se simula consulta de roles
    while (Date.now() < fin) {}
    
    fin = Date.now() + 600; // Se simula registro final
    while (Date.now() < fin) {}
    
    console.log(`Usuario ${usuario} procesado de forma bloqueante`);
  }
  const total = (Date.now() - inicio) / 1000; // Se calcula el tiempo total
  console.log(`Tiempo total bloqueante: ${total} segundos\n`);
}
versionBloqueante(); // Se ejecuta la versión bloqueante


// 2. Versión asincrónica con Promesas


// Funciones que devuelven Promesas con tiempos simulados
function consultarUsuario(id) { // Se define la función para consultar usuario
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`Usuario ${id} consultado`);
      resolve({ id, nombre: `Usuario ${id}` }); // Se devuelve objeto con nombre
    }, 1200);
  });
}

function consultarSeguridad(usuario) { // Se define la función para consultar seguridad
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`Seguridad de usuario ${usuario.id} consultada`);
      usuario.seguridad = "OK"; // Se agrega propiedad seguridad
      resolve(usuario);
    }, 800);
  });
}

function consultarRoles(usuario) { // Se define la función para consultar roles
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`Roles de usuario ${usuario.id} consultados`);
      usuario.roles = ["admin", "ventas"]; // Se agrega propiedad roles
      resolve(usuario);
    }, 2000);
  });
}

function registrar(usuario) { // Se define la función para registrar usuario
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`Usuario ${usuario.id} registrado`);
      resolve(usuario);
    }, 600);
  });
}

// Flujo completo con Promesas
function flujoPromesas(id) { // Se define el flujo secuencial para un usuario
  const inicio = Date.now(); // Se guarda tiempo inicial
  return consultarUsuario(id)
    .then(consultarSeguridad)
    .then(consultarRoles)
    .then(registrar)
    .then(usuario => {
      const fin = Date.now(); // Se guarda tiempo final
      const tiempoTotal = ((fin - inicio) / 1000).toFixed(1); // Se calcula duración
      usuario.tiempoTotal = `${tiempoTotal} segundos`; // Se agrega propiedad tiempoTotal
      console.log(`Proceso completado con Promesas para usuario ${usuario.id}\n`);
      return usuario; // Se devuelve objeto final
    });
}

// Procesar todos los usuarios en paralelo con Promesas
Promise.all(usuarios.map(id => flujoPromesas(id))).then(resultados => {
  console.log("Resultados finales con Promesas:", resultados);
});


// 3. Versión final con Async/Await

async function flujoAsync(id) { // Se define el flujo secuencial con async/await
  const inicio = Date.now(); // Se guarda tiempo inicial
  
  let usuario = await consultarUsuario(id); // Paso 1: consulta usuario
  usuario = await consultarSeguridad(usuario); // Paso 2: consulta seguridad
  usuario = await consultarRoles(usuario); // Paso 3: consulta roles
  usuario = await registrar(usuario); // Paso 4: registro final

  const fin = Date.now(); // Se guarda tiempo final
  const tiempoTotal = ((fin - inicio) / 1000).toFixed(1); // Se calcula duración
  usuario.tiempoTotal = `${tiempoTotal} segundos`; // Se agrega propiedad tiempoTotal

  console.log(`Proceso completado con Async/Await para usuario ${usuario.id}\n`);
  return usuario; // Se devuelve objeto final
}

// Procesar todos los usuarios en paralelo con Async/Await
async function procesarUsuariosAsync() { // Se define función principal
  const inicioGrupo = Date.now(); // Se guarda tiempo inicial del grupo
  const resultados = await Promise.all(usuarios.map(id => flujoAsync(id))); // Se procesan en paralelo
  const finGrupo = Date.now(); // Se guarda tiempo final del grupo
  const tiempoGrupo = ((finGrupo - inicioGrupo) / 1000).toFixed(1); // Se calcula duración total
  console.log("Resultados finales con Async/Await:", resultados); // Se imprimen resultados
  console.log(`Tiempo total del grupo: ${tiempoGrupo} segundos\n`); // Se imprime tiempo total
}
procesarUsuariosAsync(); // Se ejecuta la versión Async/Await
