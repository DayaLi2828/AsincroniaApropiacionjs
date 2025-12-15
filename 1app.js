/*Escribe un código que imprima “Inicio”, luego una operación con setTimeout que tarde 2
segundos y finalmente “Fin”.
Meta: que reconozcan el orden real de ejecución.*/

Console.log("Inicio!")//se imprime inmediatamente un mensaje de incio

setTimeout(() => {//Se agenda una funcion para que se ejecute despues de 2 segundos
    console.log("Procesando tarea...");//cuando se cumplan los dos segundos, se imprime este mensaje
2000});

console.log("Fin!")//se imprime inmediatamente un mensaje de fin