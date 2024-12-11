import { FCategory } from "./category.model";
import { TFilter } from "./filters.model";
import { FTodo } from "./todo.model";

export interface FireToDoomUserData {
  todoList: FTodo[];
  categoriesList: FCategory[];
  filters: TFilter;
  activeCategory: FCategory;
  formType: string;
}