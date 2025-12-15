/*Crear una promesa que simule un proceso que puede fallar 50% de las veces usando resolve
y reject.
Meta: entender .catch() y la importancia del manejo de errores.*/

function proceso() {//se declara una funcion proceso que retorna una promesa
  return new Promise((resolve, reject) => {//se retorna una nueva promesa
    setTimeout(() => {//se usa setTimeout para simular una tarea asincronica
      const exito = Math.random() > 0.5; // se crea una constante exito que genera un numero aleatorio entre 0 y 1, si es mayor a 0.5 es true, si no es false
      if (exito) {//si exito es true
        resolve("Proceso exitoso: Los datos se han procesado correctamente.");//resolve retorna el valor de la promesa como cumplida con un mensaje de exito
      } else {//si exito es false
        reject("Error: El proceso ha fallado.");//reject retorna el valor de la promesa como rechazada con un mensaje de error
      }
    })
  }
)}

proceso()//se llama a la funcion proceso
  .then((mensajeExito) => {//si la promesa se cumple, se ejecuta este bloque
    console.log(mensajeExito);//se imprime el mensaje de exito
  })
  .catch((mensajeError) => {//si la promesa es rechazada, se ejecuta este bloque
    console.error(mensajeError);//se imprime el mensaje de error
  });