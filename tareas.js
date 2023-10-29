const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const listaDeTareas = [];

function crearTarea(indicador, descripcion) {
    const tarea = { indicador, descripcion, completada: false };
    listaDeTareas.push(tarea);
    console.log(`Tarea '${descripcion}' agregada correctamente.`);
}

function eliminarTarea(indicador) {
    const tareaIndex = listaDeTareas.findIndex(tarea => tarea.indicador === indicador);
    if (tareaIndex !== -1) {
        const tarea = listaDeTareas.splice(tareaIndex, 1)[0];
        console.log(`Tarea '${tarea.descripcion}' eliminada correctamente.`);
    } else {
        console.log(`No se encontró una tarea con el indicador '${indicador}'.`);
    }
}

function completarTarea(indicador) {
    const tarea = listaDeTareas.find(tarea => tarea.indicador === indicador);
    if (tarea) {
        tarea.completada = true;
        console.log(`Tarea '${tarea.descripcion}' marcada como completada.`);
    } else {
        console.log(`No se encontró una tarea con el indicador '${indicador}'.`);
    }
}

function mostrarMenu() {
    console.log("\nOpciones:");
    console.log("1. Agregar tarea");
    console.log("2. Eliminar tarea");
    console.log("3. Marcar tarea como completada");
    console.log("4. Listar tareas");
    console.log("5. Salir");

    rl.question("Selecciona una opción: ", (opcion) => {
        switch (opcion) {
            case "1":
                rl.question("Introduce el indicador de la tarea: ", (indicador) => {
                    rl.question("Introduce la descripción de la tarea: ", (descripcion) => {
                        crearTarea(indicador, descripcion);
                        mostrarMenu();
                    });
                });
                break;
            case "2":
                rl.question("Introduce el indicador de la tarea a eliminar: ", (indicador) => {
                    eliminarTarea(indicador);
                    mostrarMenu();
                });
                break;
            case "3":
                rl.question("Introduce el indicador de la tarea a marcar como completada: ", (indicador) => {
                    completarTarea(indicador);
                    mostrarMenu();
                });
                break;
            case "4":
                console.log("Lista de Tareas:");
                listaDeTareas.forEach((tarea) => {
                    const estado = tarea.completada ? "Completada" : "No Completada";
                    console.log(`Indicador: ${tarea.indicador}, Descripción: ${tarea.descripcion}, Estado: ${estado}`);
                });
                mostrarMenu();
                break;
            case "5":
                console.log("¡Hasta luego!");
                rl.close();
                break;
            default:
                console.log("Opción no válida. Por favor, selecciona una opción válida.");
                mostrarMenu();
        }
    });
}

mostrarMenu();
