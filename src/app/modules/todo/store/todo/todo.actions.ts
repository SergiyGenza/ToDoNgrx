import { Action } from "@ngrx/store";
import { TodoState } from "./todo.reducer";
import { Category } from "../../common/models/category.model";
import { Folder } from "../../common/models/folder.model";

export enum todoActionsType {
  loadTodo = '[Todo] loadTodo todo item',
  toggleTodo = '[Todo] toogle todo item',

  createTodo = '[Todo] create todo item',
  createCategory = '[Category] create Category item',
  createFolder = '[Todo] create Folder item',

  editTodo = '[Todo] edit Todo item',
  editFolder = '[Folder] edit Folder item',
  editCategory = '[Category] edit Category item',

  deleteTodo = '[Todo] deleteTodo todo item',

  deleteFolder = '[Folder] delete Folder item',
  deleteFolderWithAllItems = '[Folder] delete Folder with all items',

  deleteCategory = '[Category] delete Category item',
  deleteCategoryWithAllItems = '[Todo] delete Category with all items'
};

export class TodoCreateAction implements Action {
  readonly type = todoActionsType.createTodo;
  constructor(public payload: {
    name: string;
    currentCategoryId: number | null;
    currentFolderId: number | null;
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

export class TodoCategoryEditAction implements Action {
  readonly type = todoActionsType.editCategory;
  constructor(public payload: {
    id: number;
    name: string;
  }) { }
}

export class TodoCategoryFolderCreateAction implements Action {
  readonly type = todoActionsType.createFolder;
  constructor(public payload: {
    currentCategoryId: number | null,
    folderName: string;
  }) { }
}

export class TodoEditFolderAction implements Action {
  readonly type = todoActionsType.editFolder;
  constructor(public payload: {
    id: number;
    name: string;
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
  TodoDeleteCategoryWithAllItemsAction | TodoDeleteFolderWithAllItemsAction |
  TodoEditFolderAction | TodoCategoryEditAction;