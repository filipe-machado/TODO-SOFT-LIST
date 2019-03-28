import {isEnabled} from './lib/feature';

export function render(el, state) {
    const todoItems = state.todos.map(renderTodoItem).join('');
    el.innerHTML = renderApp(
        renderInput(),
        renderTodos(todoItems)
    );
}

function renderApp(input, todoList) {
    if(isEnabled('renderBottom')) {
        return renderAddTodoAtBottom(input, todoList);
    } else if(isEnabled('filter')) {
        return renderFilter(input, todoList);
    } else if(isEnabled('renderBottom') && isEnabled('filter') && isEnabled('filterTop')) {
        return renderFilter(input, todoList);
    } else {
        return renderAddTodoAtTop(input, todoList);
    }
}

function renderAddTodoAtTop(input, todoList) {
    return `<div id="app">
        <h1 id="title">TODO LIST</h1>
        ${input}
        ${todoList}
    </div>`;
}

function renderAddTodoAtBottom(input, todoList) {
    return `<div id="app">
        <h1 id="title">TODO LIST</h1>
        ${todoList}
        ${input}
    </div>`;
}

function renderFilter(input, todoList) {
    return `<div id="app">
        <h1 id="title">TODO LIST</h1>
        ${input}

        <div class="filter">
            <div>
                <input class="filter" type="radio" id="radio1" name="filter" value="todos" checked><label>Mostrar todos</label>
            </div>
            <div>
                <input class="filter" type="radio" id="radio2" name="filter" value="abertos" ><label>Somente abertos</label>
            </div>
            <div>
                <input class="filter" type="radio" id="radio3" name="filter" value="fechados" ><label>Somente fechados</label>
            </div>
        </div>
        
        ${todoList}
    </div>`;
}

function renderInput() {
    return `<div class="todo__input"><input type="text" id="todoInput"><button id="addTodo">Add</button></div>`;
}

function renderTodos(todoItems) {
    return `<ul class="todo">${todoItems}</ul>`;
}

function renderTodoItem(todo) {
    const todoClass = `todo__item todo__item--${todo.done ? 'done' : 'open'}`;
    return `<li class="${todoClass}">
        <input class="js_toggle_todo" type="checkbox" id="cb${todo.id}" data-id="${todo.id}"${todo.done ? ' checked' : ''}>
        <label for="cb${todo.id}">${todo.text}</label>
    </li>`;
}
