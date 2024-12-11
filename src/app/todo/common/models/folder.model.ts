export interface FFolder {
  fireId: string;
  ftodoItems: string[];
  fCategoryId: string;
  name: string;
}

export interface FolderCreate {
  name: string;
  todoItems?: number[];
  currentCategoryId: number;
}

export interface Folder extends FolderCreate {
  id: number;
}