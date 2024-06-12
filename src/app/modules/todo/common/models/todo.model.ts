export interface Todo {
  id: number;
  name: string;
  completed: boolean;
  priority?: string;
  favourite: boolean;
  currentFolderName: string;
  currentCategoryName: string;
}