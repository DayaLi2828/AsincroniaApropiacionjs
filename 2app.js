/*Crea un ciclo muy grande (por ejemplo, uno que cuente hasta millones) y observa cómo afecta
la ejecución del programa.

Meta: evidenciar cómo una tarea pesada bloquea el hilo principal.*/

console.log("Inicio!");// se imprime inmediatamente al inicio 
let suma = 0;// se crea una  variable llamada suma que se le asigna a 0, se incializa en 0
for(let i = 0; i < 100; i++){//se crea un bucle for que inicia en 0 y se ejecuta mientras i sea menor a 100, incrementando i en 1 en cada iteracion
    console.log("contando hasta:", i);// se imprime en cada iteracion el valor actual de i

}
console.log("Fin!");// se imprime inmediatamente al final

