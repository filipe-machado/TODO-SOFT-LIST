import {todos} from './state';
import {listen} from './lib/events';
import {addTodo, toggleTodoState} from './actions';

export function registerEventHandlers() {
    listen('click', '#addTodo', event => {
        const todoInput = document.getElementById('todoInput');
        if (todoInput.value != "") {
            todos.dispatch(addTodo(todoInput.value));
            event.stopPropagation();
        }
    });

    listen('keydown', '#todoInput', event => {
        const todoInput = document.getElementById('todoInput');
        if (event.key === "Enter") {
            if (todoInput.value != "") {
                todos.dispatch(addTodo(todoInput.value));
                event.stopPropagation();
            }
        }
    })

    listen('click', '.js_toggle_todo', event => {
        const id = Number.parseInt(event.target.getAttribute('data-id'), 10);
        todos.dispatch(toggleTodoState(id));        
    });

    listen('click', '.filter', event => {
        const value = event.target.getAttribute('value')
        const check = event.target.checked
        const all = document.getElementsByClassName('todo__item')
        const done = document.getElementsByClassName('todo__item--done')
        const open = document.getElementsByClassName('todo__item--open')
        
        if (value === "todos" && check === true) {
            for (let index = 0; index < all.length; index++) {
                all[index].setAttribute('style', 'display: block')
            }
        }
        else if (value === "abertos" && check === true) {
            for (let index = 0; index < open.length; index++) {
                open[index].setAttribute('style', 'display: block')
            }
            for (let index = 0; index < done.length; index++) {
                done[index].setAttribute('style', 'display: none')
            }
        } 
        else if (value === "fechados" && check === true) {
            for (let index = 0; index < open.length; index++) {
                open[index].setAttribute('style', 'display: none')
            }
            for (let index = 0; index < done.length; index++) {
                done[index].setAttribute('style', 'display: block')
            }
        }
    });
}
