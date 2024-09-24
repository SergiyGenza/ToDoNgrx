import { TPrority } from "./priority.model";

export interface TodoCreate {
  name: string;
  favourite?: boolean;
  priority?: TPrority;
  currentFolderId: string | null;
  currentCategoryId: string | null;
}

export interface Todo extends TodoCreate {
  id: string;
  completed: boolean;
}

export interface FTodo extends TodoCreate {
  key?: string;
}