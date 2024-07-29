import { Category } from "./category.model";
import { Folder } from "./folder.model";
import { Todo } from "./todo.model";

export interface ModalOption {
  title?: string,
  type?: string,
  size?: string,
  todo?: Todo,
  folder?: Folder,
  categoriesList?: Category[], 
}