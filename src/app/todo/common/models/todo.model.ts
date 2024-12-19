import { TPriority } from "./priority.model";

export interface FTodo extends Omit<TodoCreate, 'currentFolderId' | 'currentCategoryId'> {
  fireId: string;
  fCategoryId: string;
  fFolderId: string;
}

export interface TodoCreate {
  name: string;
  favourite: boolean;
  priority: TPriority;
  currentFolderId: number | null;
  currentCategoryId: number | null;
  date: Date;
}

export interface Todo extends TodoCreate {
  id: any;
  completed: boolean;
}