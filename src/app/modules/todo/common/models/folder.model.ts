import { TPrority } from "./priority.model";

export interface FolderCreate {
  name: string;
  favourite?: boolean;
  todoItems?: number[];
  // priority?: TPrority;
  currentCategoryId: string | null;
  key?: string;
}

export interface Folder extends FolderCreate {
  id: string;
}

export interface FFolder extends FolderCreate {
  key?: string;
}