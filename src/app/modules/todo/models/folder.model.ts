import { Todo } from "./todo.model";

export interface Folder {
  id: number;
  name: string;
  favourite: boolean;
  todoItems: Todo[];
}