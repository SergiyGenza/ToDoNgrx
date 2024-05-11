import { Todo } from "./todo.model";

export interface Folder {
  id: string;
  title: string;
  todoItems: Todo[];
}