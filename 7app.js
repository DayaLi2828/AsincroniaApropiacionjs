/*Crear una función async que espere una promesa de 2 segundos y luego muestre el resultado.
Meta: comprender cómo await pausa la ejecución sin bloquear el hilo.*/

function esperarPromesa(){//se declara una funcion llamada esperarPromesa
  return new Promise((resolve) => {//se retorna una nueva promesa
    setTimeout(() => resolve("¡Promesa cumplida!"), 2000);//se usa setTimeout para simular una tarea asincronica que tarda 2 segundos en resolverse, despues de ese tiempo se llama a resolve con el mensaje "¡Promesa cumplida!"
  });
}

async function iniciar() {//se declara una funcion asincronica llamada iniciar
  console.log("Esperando la promesa");//se imprime en consola "Esperando la promesa"
  const prome = await esperarPromesa();//se espera a que la promesa de esperarPromesa se resuelva y se asigna su valor a la constante prome
  console.log(prome);//se imprime en consola el valor de prome, que sera "¡Promesa cumplida!"
}

iniciar();//se llama a la funcion iniciar