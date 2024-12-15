

export interface FolderCreate {
  name: string;
  todoItems?: number[];
  currentCategoryId: number;
}

export interface FFolder extends FolderCreate {
  id: string
}

export interface Folder extends FolderCreate {
  id: number;
}