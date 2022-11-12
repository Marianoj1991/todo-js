

export class Todo {

   static fromJson({tarea, id, creado, completado}) {

        const todoTemp      = new Todo (tarea);

        todoTemp.id         = id;
        todoTemp.creado     = creado;
        todoTemp.completado = completado;
        
        return todoTemp;

   }

    constructor( tarea ) {
        this.tarea = tarea;

        this.id = new Date().getTime();
        this.completado = false;
        this.creado     = new Date();
    }

    imprimirClase() {
        console.log(`${this.tarea} - ${this.id}`);
    }

}
