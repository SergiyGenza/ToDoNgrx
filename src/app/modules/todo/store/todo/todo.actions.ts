import { Action } from "@ngrx/store";
import { TodoState } from "./todo.reducer";

export enum todoActionsType {
  createTodo = '[Todo] create todo item',
  toggleTodo = '[Todo] toogle todo item',
  editTodo = '[Todo] editTodo todo item',
  deleteTodo = '[Todo] deleteTodo todo item',
  loadTodo = '[Todo] loadTodo todo item',
  createCategory = '[Todo] create Category item',
  createFolder = '[Todo] create Folder item',
  deleteFolder = '[Todo] delete Folder item',
  deleteFolderWithAllItems = '[Todo] delete Folder with all items',
  deleteCategory = '[Todo] delete Category item',
  deleteCategoryWithAllItems = '[Todo] delete Category with all items'
};

export class TodoCreateAction implements Action {
  readonly type = todoActionsType.createTodo;
  constructor(public payload: {
    name: string;
    currentCategoryName: string;
    currentFolderName: string;
  }) { }
}
export class TodoDeleteAction implements Action {
  readonly type = todoActionsType.deleteTodo;
  constructor(public payload: {
    id: number;
  }) { }
}

export class TodoEditAction implements Action {
  readonly type = todoActionsType.editTodo;
  constructor(public payload: {
    id: number;
    name: string
  }) { }
}
export class TodoToggleAction implements Action {
  readonly type = todoActionsType.toggleTodo;
  constructor(public payload: {
    id: number;
  }) { }
}

export class TodoLoadStateAction implements Action {
  readonly type = todoActionsType.loadTodo;

  constructor(public payload: {
    state: TodoState
  }) { }
}


export class TodoCategoryCreateAction implements Action {
  readonly type = todoActionsType.createCategory;
  constructor(public payload: {
    name: string;
  }) { }
}

export class TodoCategoryFolderCreateAction implements Action {
  readonly type = todoActionsType.createFolder;
  constructor(public payload: {
    categoryName: string,
    folderName: string;
  }) { }
}

export class TodoDeleteFolderAction implements Action {
  readonly type = todoActionsType.deleteFolder;
  constructor(public payload: {
    id: number;
    name: string;
  }) { }
}
export class TodoDeleteFolderWithAllItemsAction implements Action {
  readonly type = todoActionsType.deleteFolderWithAllItems;
  constructor(public payload: {
    id: number;
    name: string;
  }) { }
}
export class TodoDeleteCategoryAction implements Action {
  readonly type = todoActionsType.deleteCategory;
  constructor(public payload: {
    id: number;
    name: string;
  }) { }
}
export class TodoDeleteCategoryWithAllItemsAction implements Action {
  readonly type = todoActionsType.deleteCategoryWithAllItems;
  constructor(public payload: {
    id: number;
    name: string;
  }) { }
}

export type TodoActions = TodoCreateAction |
  TodoDeleteAction | TodoToggleAction |
  TodoEditAction | TodoLoadStateAction |
  TodoCategoryCreateAction | TodoCategoryFolderCreateAction |
  TodoDeleteFolderAction | TodoDeleteCategoryAction |
  TodoDeleteCategoryWithAllItemsAction | TodoDeleteFolderWithAllItemsAction;