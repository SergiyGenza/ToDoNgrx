import { Action } from "@ngrx/store";
import { TodoState } from "./todo.reducer";
import { Category, FCategory } from "../../common/models/category.model";
// import { Folder } from "../../common.models/folder.model";
import { TPrority } from "../../common/models/priority.model";
import { FTodo, TodoCreate } from "../../common/models/todo.model";
import { FFolder } from "../../common/models/folder.model";

export enum todoActionsType {
  loadTodoFirebase = '[Todo] loadTodo Firebase todo item',
  loadTodo = '[Todo] loadTodo todo item',
  loadTodosSuccess = '[Todo] loadTodos success',
  loadTodosFailure = '[Todo] loadTodos failure',

  loadCategories = '[Todo] Load Categories',
  loadCategoriesSuccess = '[Todo] Load Categories Success',
  loadCategoriesFailure = '[Todo] Load Categories Failure',



  toggleTodo = '[Todo] toggle todo item',

  createTodo = '[Todo] create todo item',
  createCategory = '[Category] create Category item',
  createFolder = '[Todo] create Folder item',
  createFolderFirebase = '[Todo] create Folder Firebase item',

  createFolderSuccess = '[Todo] Create Folder Success',
  createFolderFailure = '[Todo] Create Folder Failure',

  editTodo = '[Todo] edit Todo item',
  editFolder = '[Folder] edit Folder item',
  editCategory = '[Category] edit Category item',

  deleteTodo = '[Todo] deleteTodo todo item',

  deleteFolder = '[Folder] delete Folder item',
  deleteFolderWithAllItems = '[Folder] delete Folder with all items',

  deleteCategory = '[Category] delete Category item',
  deleteCategoryWithAllItems = '[Todo] delete Category with all items',

  changeTodoPriority = '[Todo] change todo priority'
};

export class LoadCategories implements Action {
  readonly type = todoActionsType.loadCategories;
}

export class LoadCategoriesSuccess implements Action {
  readonly type = todoActionsType.loadCategoriesSuccess;
  constructor(public payload: { categories: FCategory[] }) {
  }
}

export class CreateFolderAction implements Action {
  readonly type = todoActionsType.createFolder;
  constructor(
    public payload: {
      folder: FFolder; // Adjust this according to your folder structure
      currentCategoryId: string; // Include currentCategoryId
    }) { }
}


export class CreateFolderSuccess implements Action {
  readonly type = todoActionsType.createFolderSuccess;

  constructor(public payload: { folder: FFolder; currentCategoryId: string }) { }
}


export class CreateFolderFailure implements Action {
  readonly type = todoActionsType.createFolderFailure;
  constructor(public payload: { error: any }) { }
}

export class LoadCategoriesFailure implements Action {
  readonly type = todoActionsType.loadCategoriesFailure;
  constructor(public payload: { error: any }) { }
}

export class LoadTodos implements Action {
  readonly type = todoActionsType.loadTodoFirebase;
}

export class LoadTodosSuccess implements Action {
  readonly type = todoActionsType.loadTodosSuccess;
  constructor(public payload: { todos: any[] }) { }
}

export class LoadTodosFailure implements Action {
  readonly type = todoActionsType.loadTodosFailure;
  constructor(public payload: { error: any }) { }
}

export class TodoCreateAction implements Action {
  readonly type = todoActionsType.createTodo;
  constructor(public payload: TodoCreate) { }
}

export class TodoDeleteAction implements Action {
  readonly type = todoActionsType.deleteTodo;
  constructor(public payload: { id: string }) { }
}

export class TodoEditAction implements Action {
  readonly type = todoActionsType.editTodo;
  constructor(public payload: { id: string, name: string }) { }
}

export class TodoToggleAction implements Action {
  readonly type = todoActionsType.toggleTodo;
  constructor(public payload: { id: string }) { }
}

export class TodoLoadStateAction implements Action {
  readonly type = todoActionsType.loadTodo;

  constructor(public payload: { state: TodoState }) { }
}

export class TodoCategoryCreateAction implements Action {
  readonly type = todoActionsType.createCategory;
  constructor(public payload: FCategory) { }
}

export class TodoCategoryEditAction implements Action {
  readonly type = todoActionsType.editCategory;
  constructor(public payload: { id: string, name: string }) { }
}

export class TodoCategoryFolderCreateAction implements Action {
  readonly type = todoActionsType.createFolder;
  constructor(public payload: { currentCategoryId: string | null, folderName: string }) { }
}

export class TodoEditFolderAction implements Action {
  readonly type = todoActionsType.editFolder;
  constructor(public payload: { id: string, name: string }) { }
}

export class TodoDeleteFolderAction implements Action {
  readonly type = todoActionsType.deleteFolder;
  constructor(public payload: { id: string }) { }
}

export class TodoDeleteFolderWithAllItemsAction implements Action {
  readonly type = todoActionsType.deleteFolderWithAllItems;
  constructor(public payload: { id: string }) { }
}

export class TodoDeleteCategoryAction implements Action {
  readonly type = todoActionsType.deleteCategory;
  constructor(public payload: { id: string }) { }
}

export class TodoDeleteCategoryWithAllItemsAction implements Action {
  readonly type = todoActionsType.deleteCategoryWithAllItems;
  constructor(public payload: { id: string }) { }
}

export class ChangeTodoPriority implements Action {
  readonly type = todoActionsType.changeTodoPriority;
  constructor(public payload: { id: string, priority: TPrority }) { }
}

export type TodoActions = LoadTodos | LoadTodosSuccess | LoadTodosFailure |
  TodoCreateAction | TodoDeleteAction | TodoToggleAction | TodoEditAction |
  TodoLoadStateAction | TodoCategoryCreateAction | TodoCategoryEditAction |
  TodoCategoryFolderCreateAction | TodoEditFolderAction |
  TodoDeleteFolderAction | TodoDeleteFolderWithAllItemsAction |
  TodoDeleteCategoryAction | TodoDeleteCategoryWithAllItemsAction | ChangeTodoPriority
  | LoadCategories
  | LoadCategoriesSuccess
  | LoadCategoriesFailure
  | CreateFolderAction
  | CreateFolderSuccess
  | CreateFolderFailure;
