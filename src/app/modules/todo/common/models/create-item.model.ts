import { Folder } from "./folder.model";
import { Todo } from "./todo.model";

export interface CreateItem {
  type: string;
  name: string;
  currentFolderName: string;
  currentCategoryName: string;
}

export interface EditItem {
  type: string;
  item: Todo;
  // itemName: string;
  // itemId: number
}