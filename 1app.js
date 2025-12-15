/*Escribe un código que imprima “Inicio”, luego una operación con setTimeout que tarde 2
segundos y finalmente “Fin”.
Meta: que reconozcan el orden real de ejecución.*/

Console.log("Inicio!")

setTimeout(() => {
    console.log("Procesando tarea...");
2000});

console.log("Fin!")