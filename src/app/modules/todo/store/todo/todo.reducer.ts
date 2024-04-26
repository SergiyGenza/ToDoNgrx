import { Todo } from "../../models/todo.model";
import { TodoActions, TodoCreateAction, todoActionsType } from "./todo.actions";

export const TODO_REDUCER_NODE = 'todo';

export interface TodoState {
  idIncrement: number;
  todoList: Todo[];
}

const initialState: TodoState = {
  idIncrement: 1,
  todoList: [],
}

export const todoReducer = (state = initialState, actions: TodoActions) => {
  switch (actions.type) {
    case todoActionsType.create:
      return {
        ...state,
        idIncrement: state.idIncrement + 1,
        todoList: [
          ...state.todoList,
          {
            id: state.idIncrement,
            name: actions.payload.name,
            completed: false,
          }
        ]
      };
    case todoActionsType.delete:
      return {
        ...state,
        todoList: state.todoList.filter(todo => todo.id != actions.payload.id)
      };
    case todoActionsType.toggle:
      return {
        ...state,
        todoList: state.todoList.map(todo => todo.id === actions.payload.id ? {
          ...todo,
          completed: !todo.completed,
        } : todo)
      }
    case todoActionsType.edit:
      return {
        ...state,
        todoList: state.todoList.map(todo => todo.id === actions.payload.id ? {
          ...todo,
          name: actions.payload.name
        } : todo)
      };
    case todoActionsType.load:
      return {
        ...actions.payload.state
      }
    default:
      return state
  }
}