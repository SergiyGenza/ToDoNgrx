import { TPrority } from "./priority.model";

export interface FolderCreate {
  name: string;
  favourite?: boolean;
  todoItems?: number[];
  // priority?: TPrority;
  currentCategoryId: number | null;
}

export interface Folder extends FolderCreate {
  id: number;
}