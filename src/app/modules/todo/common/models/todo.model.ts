import { TPriority } from "./priority.model";

export interface TodoCreate {
  name: string;
  favourite?: boolean;
  priority?: TPriority;
  currentFolderId: number | null;
  currentCategoryId: number | null;
}

export interface Todo extends TodoCreate {
  id: number;
  completed: boolean;
}