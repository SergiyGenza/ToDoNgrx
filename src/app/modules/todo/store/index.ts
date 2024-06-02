import { CategoryState, categoryReducer } from "./category/category.reducer";
import { TodoState, todoReducer } from "./todo/todo.reducer";
import { ActionReducerMap } from '@ngrx/store';

export const rootReducer = {};

export interface AppState {
  todoList: TodoState;
  category: CategoryState;
};

export const appReducers: ActionReducerMap<AppState, any> = {
  todoList: todoReducer,
  category: categoryReducer,
};