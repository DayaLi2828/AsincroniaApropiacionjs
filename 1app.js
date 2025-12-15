/*Escribe un código que imprima “Inicio”, luego una operación con setTimeout que tarde 2
segundos y finalmente “Fin”.
Meta: que reconozcan el orden real de ejecución.*/

console.log("Inicio!"); 
// Se imprime inmediatamente un mensaje de inicio

setTimeout(() => { 
  // Se agenda una función para ejecutarse después de cierto tiempo
    console.log("Fin!");// Este mensaje aparecerá cuando pasen los 2000 ms
}, 2000); 

// Se imprime enseguida, sin esperar al setTimeout
console.log("Procesando tarea..."); 