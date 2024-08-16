import { Category } from "./category.model";
import { Folder } from "./folder.model";
import { Todo } from "./todo.model";

export interface EditItem {
  type: string;
  todo?: Todo;
  folder?: Folder;
  category?: Category;
}