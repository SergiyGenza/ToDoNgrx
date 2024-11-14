import { TPriority } from "./priority.model";

export interface FolderCreate {
  name: string;
  favourite?: boolean;
  todoItems?: number[];
  currentCategoryId: number | null;
}

export interface Folder extends FolderCreate {
  id: number;
}