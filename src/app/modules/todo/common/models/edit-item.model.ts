import { Category } from "./category.model";
import { Folder } from "./folder.model";
import { Todo } from "./todo.model";

export interface EditItem extends Items {
  type?: string;
}

export interface Items {
  todo?: Todo;
  folder?: Folder;
  category?: Category;
}