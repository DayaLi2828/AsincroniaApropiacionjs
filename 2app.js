/*Crea un ciclo muy grande (por ejemplo, uno que cuente hasta millones) y observa cómo afecta
la ejecución del programa.

Meta: evidenciar cómo una tarea pesada bloquea el hilo principal.*/

console.log("Inicio!");
let suma = 0;
for(let i = 0; i < 100; i++){
    console.log("contando hasta:", i);

}
console.log("Fin!");

