
const { rejects } = require("assert");
const { resolve } = require("path");
const readline = require("readline");
const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});



const listaDeTareas = [];


function crearTarea(indicador, descripcion) {
    return new Promise ( (resolve, rejects) => {setTimeout(() => { 
    const tarea = { indicador, descripcion, completada: false };
    listaDeTareas.push(tarea);
    console.log(`Tarea '${descripcion}' agregada correctamente.`);
      resolve();
}, 4000);} );
}


function eliminarTarea(indicador) {
    return new Promise ((resolve , rejects) => {setTimeout(() => {
        const tareaIndex = listaDeTareas.findIndex(tarea => tarea.indicador === indicador);
    if (tareaIndex !== -1) {
        const tarea = listaDeTareas.splice(tareaIndex, 1)[0];
        console.log(`Tarea '${tarea.descripcion}' eliminada correctamente.`);
        resolve();
    } else {
        console.log(`No se encontró una tarea con el indicador '${indicador}'.`);
        resolve();}
    }, 2000);}) ;
}


function completarTarea(indicador) {
    return new Promise((resolve, rejects)=>{setTimeout(() => {
        const tarea = listaDeTareas.find(tarea => tarea.indicador === indicador);
    if (tarea) {
        tarea.completada = true;
        console.log(`Tarea '${tarea.descripcion}' marcada como completada.`);
        resolve()
    } else {
        console.log(`No se encontró una tarea con el indicador '${indicador}'.`);
        resolve();
    }
    }, 4000);});
    
}function mostrarMenu() {
        console.log("Opciones:");
        console.log("1. Agregar tarea");
        console.log("2. Eliminar tarea");
        console.log("3. Marcar tarea como completada");
        console.log("4. Lista de tareas");
        console.log("5. Salir");}




async function ejecutarMenu() {
    while (true) {
      mostrarMenu();
      const opcion = await pregunta("Selecciona una opción: ");
      switch (opcion) {
        case "1":
          const indicadorAgregar = await pregunta("Introduce el indicador de la tarea: ");
          const descripcionAgregar = await pregunta("Introduce la descripción de la tarea: ");
          await crearTarea(indicadorAgregar, descripcionAgregar);
          break;
        case "2":
          const indicadorEliminar = await pregunta("Introduce el indicador de la tarea a eliminar: ");
          await eliminarTarea(indicadorEliminar);
          break;
        case "3":
          const indicadorCompletar = await pregunta("Introduce el indicador de la tarea a marcar como completada: ");
          await completarTarea(indicadorCompletar);
          break;
        case "4":
          console.log("Lista de Tareas:");
          listaDeTareas.forEach((tarea) => {
            const estado = tarea.completada ? "Completada" : "No Completada";
            console.log(`Indicador: ${tarea.indicador}, Descripción: ${tarea.descripcion}, Estado: ${estado}`);
          });
          break;
        case "5":
          console.log("¡Hasta luego!");
          interface.close();
          return;
        default:
          console.log("Opción no válida. Por favor, selecciona una opción válida.");
      }
    }
  }
  
  async function pregunta(pregunta) {
    return new Promise((resolve) => {
      interface.question(pregunta, (respuesta) => {
        resolve(respuesta);
      });
    });
  }
  
  async function iniciarPrograma() {
    await ejecutarMenu();
  }
  
  iniciarPrograma();
  
