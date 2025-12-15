/*Crear tres procesos consecutivos (por ejemplo: tomar datos → procesar datos → mostrar
resultado), cada uno con un setTimeout, y enlazarlos mediante callbacks.
Meta: mostrar la complejidad que aparece cuando las tareas dependen unas de otras.*/

function tomarDatos(callbacks) {//se declara una  funcion tomarDatos que recibe un parametro callbacks
  setTimeout(() => {//se usa setTimeout para simular una tarea asincronica
    console.log("Tomar datos");//se imprime en consola "Tomar datos" despues de 3 segundos
    callbacks();//se llama a la funcion callbacks pasada como parametro
  }, 3000);
}

function procesarDatos(callbacks) {//se declara una  funcion procesarDatos que recibe un parametro callbacks
  setTimeout(() => {//se usa setTimeout para simular una tarea asincronica
    console.log("Procesar datos");//se imprime en consola "Procesar datos" despues de 2 segundos
    callbacks();//se llama a la funcion callbacks pasada como parametro
  }, 2000);
}

function mostrarDatos() {//se declara una  funcion mostrarDatos
  setTimeout(() => {//se usa setTimeout para simular una tarea asincronica
    console.log("mostrar datos");//se imprime en consola "mostrar datos" despues de 1 segundo 
  }, 1000);
}
//Encademaniento de callbacks
tomarDatos(() => {//se llama a la funcion tomarDatos y se le pasa un callback
  procesarDatos(() => {//se llama a la funcion procesarDatos dentro del callback de tomarDatos
    mostrarDatos();//se llama a la funcion mostrarDatos dentro del callback de procesarDatos
  });
})
//Resultado:
// Tomar datos
// Procesar datos
// mostrar datos
