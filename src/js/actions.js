
export function toggleTodoState(id) {
    return {
        type: 'TODO_TOGGLE_DONE',
        id
    };
}

export function filterTodo(filter) {
    return {
        type: 'FILTER_TODO',
        filter
    }
}

export function addTodo(text) {
    return {
        type: 'ADD_TODO',
        text
    }
}
