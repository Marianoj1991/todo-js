import { Todo } from '../classes';
import { todoList } from '../index'; 


// REFERENCIAS HTML
const divHtmlTodo  = document.querySelector('.todo-list');
const txtInput     = document.querySelector('.new-todo');
const btnBorrar    = document.querySelector('.clear-completed');
const ulFiltros    = document.querySelector('.filters');
const ancorFiltros = document.querySelectorAll('.filtro');


export const crearTodoHtml = ( todo ) => {

    const todoHtml = `
    <li class="${ ( todo.completado ) ? 'completed' : '' }" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${ ( todo.completado ) ? 'checked' : '' }>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
         </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`

    const div     = document.createElement('div');
    div.innerHTML = todoHtml; 
    divHtmlTodo.append(div.firstElementChild);    

    return div.firstElementChild;
}

txtInput.addEventListener( 'keyup', (event) => {

    if( event.keyCode === 13 && txtInput.value.length > 0 ) {
        const newTodo = new Todo( txtInput.value );
        todoList.nuevoTodo(newTodo);
        crearTodoHtml( newTodo );

        txtInput.value = '';
    }

}) 

divHtmlTodo.addEventListener( 'click', ( event ) => {

    const nombreElemento = event.target.localName;
    const todoElemento   = event.target.parentElement.parentElement;
    const idElemento     = todoElemento.getAttribute('data-id');
    
    if ( nombreElemento.includes( 'input' ) ) {

        todoList.marcarCompletado( idElemento );
        todoElemento.classList.toggle('completed');

    } else if ( nombreElemento.includes('button') ) {

        todoList.eliminarTodo( idElemento ); 
        divHtmlTodo.removeChild( todoElemento );

    } 


}) 

btnBorrar.addEventListener( 'click', () => {

    todoList.eliminarCompletado();

    for ( let i = divHtmlTodo.children.length -1; i >= 0; i-- ) {

        const elemento = divHtmlTodo.children[i];

        if ( elemento.classList.contains('completed')) {
            divHtmlTodo.removeChild( elemento );
        };
    };
} );

ulFiltros.addEventListener( 'click', (event) => {

    const filtro = event.target.text; 
    if (!filtro) {return;}

    ancorFiltros.forEach((elem) => elem.classList.remove('selected'))
    event.target.classList.add('selected');

    for(const elemento of divHtmlTodo.children) {

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch(filtro) {

            case 'Pendientes':
                if(completado) {
                    elemento.classList.add('hidden');
                }
                break;
            
            case 'Completados': 
                if(!completado) {
                    elemento.classList.add('hidden');
                }
                break;
        }
    }
} )
























// ulFiltros.addEventListener('click', (event) => {

//    const filtro = event.target.text;
//    if ( !filtro ) {return;}

//    ancorFiltros.forEach((elem) => elem.classList.remove('selected') );
//    event.target.classList.add('selected');

//    for ( const elemento of divHtmlTodo ) {

//         elemento.classList.remove('hidden');
//         const completado = elemento.classList.contains('completed');

//         switch (filtro) {

//             case 'Pendientes':
//                 if(completado) {
//                     elemento.classList.add('hidden');
//                 }
//                 break;

//             case 'Completado':
//                 if(!completado) {
//                     elemento.classList.add('hidden');
//                 }
//                 break;

//         }

//    }

// })