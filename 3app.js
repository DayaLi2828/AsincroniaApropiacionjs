function tareaConCallback(callback) { // Se define una función que recibe como parámetro otra función llamada "callback", la cual se ejecutará más tarde.
    setTimeout(() => { // Se usa setTimeout para simular una tarea asincrónica que se ejecutará después de 1500 ms.
      const resultado = "Datos procesados"; // Se crea una constante llamada "resultado" que guarda el texto "Datos procesados".
      callback(resultado); // Se llama a la función "callback" y se le pasa como argumento el valor de "resultado".
    }, 1500); // Se especifica el tiempo de espera de 1500 milisegundos (1.5 segundos).
  }
  
  tareaConCallback((resul) => { // Se invoca la función "tareaConCallback" y se le pasa un callback que recibe el valor procesado.
    console.log("Callback recibió:", resul); // Se imprime en consola el mensaje junto con el valor recibido del callback.
  });
  