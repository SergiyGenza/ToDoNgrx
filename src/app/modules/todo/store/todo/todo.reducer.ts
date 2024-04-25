import { Todo } from "../../models/todo.model";
import { TodoCreateAction, todoActionsType } from "./todo.actions";

export const TODO_REDUCER_NODE = 'todo';

export interface TodoState {
  idIncrement: number;
  todoList: Todo[];
}

const initialState: TodoState = {
  idIncrement: 1,
  todoList: [],
}

export const todoReducer = (state = initialState, actions: TodoCreateAction) => {
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

    default:
      return state
  }
}