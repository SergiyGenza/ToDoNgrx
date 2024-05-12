import { Action } from "@ngrx/store";
import { TodoState } from "./todo.reducer";

export enum todoActionsType {
  createTodo = '[Todo] create todo item',
  toggle = '[Todo] toogle todo item',
  edit = '[Todo] edit todo item',
  delete = '[Todo] delete todo item',
  load = '[Todo] load todo item',
  createCategory = '[Todo] create Category item',
  createFolder = '[Todo] create Folder item',
};

export class TodoCreateAction implements Action {
  readonly type = todoActionsType.createTodo;

  constructor(public payload: {
    name: string;
  }) { }
}
export class TodoDeleteAction implements Action {
  readonly type = todoActionsType.delete;

  constructor(public payload: {
    id: number;
  }) { }
}

export class TodoEditAction implements Action {
  readonly type = todoActionsType.edit;

  constructor(public payload: {
    id: number;
    name: string
  }) { }
}
export class TodoToggleAction implements Action {
  readonly type = todoActionsType.toggle;

  constructor(public payload: {
    id: number;
  }) { }
}

export class TodoLoadStateAction implements Action {
  readonly type = todoActionsType.load;

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

export type TodoActions = TodoCreateAction |
  TodoDeleteAction | TodoToggleAction |
  TodoEditAction | TodoLoadStateAction |
  TodoCategoryCreateAction | TodoCategoryFolderCreateAction;