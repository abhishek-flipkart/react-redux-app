import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from 'redux';

let nextTodoId = 0;

class TodoApp extends React.Component {
  render () {
    return (
      <div>
        <input ref={node => {
          this.input = node;
        }} />
        <button onClick={() => {
          store.dispatch({
            type: 'ADD_TODO',
            text: this.input.value,
            id: nextTodoId++
          });
          this.input.value = '';
        }}>
          Add Todo
        </button>
        <ul>
          {this.props.todos.map(todo =>
            <li key={todo.id}
                onClick={() => {
                  store.dispatch({
                    type: 'TOGGLE_TODO',
                    id: todo.id
                  });         
                }}
                style={{
                  textDecoration:
                    todo.completed ?
                      'line-through' :
                      'none'
                }}>
              {todo.text}
            </li>
          )}
        </ul>
      </div>
    );
  }
}



//Composing reducer
const todo = (state, action) => {
  console.log('todo')
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        completed: !state.completed
      };
    default:
      return state;
  }
};

//Reducer todos
const todos = (state = [], action) => {
  console.log('todos')
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ];
    case 'TOGGLE_TODO':
      return state.map(t =>
        todo(t, action)
      );
    default:
      return state;
  }
};

//Reducer Visbility
const visibilityFilter = (
  state = 'SHOW_ALL',
  action
) => {
  console.log('visibilityFilter')
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

const todoApp = combineReducers({
  todos,
  visibilityFilter
});

const store = createStore(todoApp);

const render = () => {
  ReactDOM.render(
    <TodoApp
      todos={store.getState().todos}
    />,
    document.getElementById('app')
  );
};

store.subscribe(render);
render();