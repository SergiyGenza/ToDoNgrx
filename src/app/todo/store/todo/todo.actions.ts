import { Action, createAction, props } from "@ngrx/store";
import { TodoState } from "./todo.reducer";
import { Category } from "../../common/models/category.model";
import { Folder } from "../../common/models/folder.model";
import { TPriority } from "../../common/models/priority.model";
import { TFilter } from "../../common/models/filters.model";

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
  deleteCategoryWithAllItems = '[Todo] delete Category with all items',

  changeTodoPriority = '[Todo] change todo priority',
  toggleTodoFavouriteStatus = '[Todo] change todo favourite status',

  toggleFavouriteFilter = '[Filter Favourite] change fav filter',
  togglePriorityFilter = '[Filter Priority] change prio filter',
  toggleStatusFilter = '[Filter Status] change status filter',
  toggleAlphabeticaSortFilter = '[Filter Alphabetica Sort] change alphabetica sort filter',

  changeActiveCategory = '[Active Category] Active Category changed',
  changeFormType = '[Form Type] Form Type changed'
};

export class TodoCreateAction implements Action {
  readonly type = todoActionsType.createTodo;
  constructor(public payload: {
name: string;
currentCategoryId: number | null;
currentFolderId: number | null;
date: Date;
  }) { }
}

// export const TodoCreateAction = createAction(
//   '[Todo] create todo item',
//   props<{
//     name: string;
//     currentCategoryId: number | null;
//     currentFolderId: number | null;
//     date: Date
//   }>
// );



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

export class ChangeTodoPriority implements Action {
  readonly type = todoActionsType.changeTodoPriority;
  constructor(public payload: {
    id: number;
    priority: TPriority;
  }) { }
}

export class ToggleTodoFavouriteStatus implements Action {
  readonly type = todoActionsType.toggleTodoFavouriteStatus;
  constructor(public payload: {
    id: number;
  }) { }
}

// filters
export class ToogleFavouriteFilter implements Action {
  readonly type = todoActionsType.toggleFavouriteFilter;
}

export class ToogleProirityFilter implements Action {
  readonly type = todoActionsType.togglePriorityFilter;
}
export class ToogleStatusFilter implements Action {
  readonly type = todoActionsType.toggleStatusFilter;
}

export class ToggleAlphabeticaSortFilter implements Action {
  readonly type = todoActionsType.toggleAlphabeticaSortFilter;
}

export const ToogleProirityFilterF = createAction(
  '[Filter] Toggle Priority Filter',
  props<{ filters: TFilter }>
);


export class ChangeActiveCategory implements Action {
  readonly type = todoActionsType.changeActiveCategory;
  constructor(public payload: {
    activeCategory: Category | null;
  }) { }
}

export class ChangeFormType implements Action {
  readonly type = todoActionsType.changeFormType;
  constructor(public payload: {
    formType: 'category' | 'folder' | 'todo';
  }) { }
}

export const GetDataFromFirebase = createAction(
  '[Get data]',
)

export type TodoActions =
  TodoCreateAction |
  TodoDeleteAction | TodoToggleAction |
  TodoEditAction | TodoLoadStateAction |
  TodoCategoryCreateAction | TodoCategoryFolderCreateAction |
  TodoDeleteFolderAction | TodoDeleteCategoryAction |
  TodoDeleteCategoryWithAllItemsAction | TodoDeleteFolderWithAllItemsAction |
  TodoEditFolderAction | TodoCategoryEditAction | ChangeTodoPriority |
  ToggleTodoFavouriteStatus | ToogleFavouriteFilter | ToogleProirityFilter |
  ToogleStatusFilter | ChangeActiveCategory | ChangeFormType | ToggleAlphabeticaSortFilter;