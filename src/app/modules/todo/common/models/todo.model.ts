export interface TodoCreate {
  name: string;
  favourite?: boolean;
  priority?: string;
  currentFolderId: number | null;
  currentCategoryId: number | null;
}

export interface Todo extends TodoCreate {
  id: number;
  completed: boolean;
}