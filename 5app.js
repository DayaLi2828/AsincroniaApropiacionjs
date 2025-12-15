/*Convertir el ejercicio anterior en una estructura basada en Promesas con .then().
Meta: visualizar cómo mejora la legibilidad.*/

function tomarDatos() {//se declara una  funcion tomarDatos
  return new Promise((resolve) => {//se retorna una nueva promesa
    setTimeout(() => { //se usa setTimeout para simular una tarea asincronica
      console.log("tomar datos");//se imprime en consola "tomar datos" despues de 3 segundos
      resolve();//resolve retorna el valor de la promesa como cumplida
    }, 3000);
  })
}

function procesarDatos() {//se declara una  funcion procesarDatos
  return new Promise((resolve) => {//se retorna una nueva promesa
    setTimeout(() => {//se usa setTimeout para simular una tarea asincronica
      console.log("procesar datos");//se imprime en consola "procesar datos" despues de 2 segundos
      resolve(); //resolve retorna el valor de la promesa como cumplida
    }, 2000);
  })
}

function mostrarDatos() {//se declara una  funcion mostrarDatos
  return new Promise((resolve) => {//se retorna una nueva promesa
    setTimeout(() => {//se usa setTimeout para simular una tarea asincronica
      console.log("mostrar datos");//se imprime en consola "mostrar datos" despues de 1 segundo
      resolve();//resolve retorna el valor de la promesa como cumplida 
    }, 1000);
  })
}
//encadenamiento con .then
tomarDatos()//se llama a la funcion tomarDatos
  .then(procesarDatos)//se llama a la funcion procesarDatos cuando la promesa de tomarDatos se cumple
  .then(mostrarDatos);//se llama a la funcion mostrarDatos cuando la promesa de procesarDatos se cumple