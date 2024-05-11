import { Action } from "@ngrx/store";
import { CategoryState } from "./category.reducer";

export enum categoryActionsType {
  create = '[Category] create category item',
  edit = '[Category] edit category item',
  delete = '[Category] delete category item',
  load = '[Category] load category item',
};

export class CategoryCreateAction implements Action {
  readonly type = categoryActionsType.create;

  constructor(public payload: {
    name: string
  }) { }
}

export class CategoryEditAction implements Action {
  readonly type = categoryActionsType.edit;

  constructor(public payload: {
    id: number;
    name: string
  }) { }
}

export class CategoryDeleteAction implements Action {
  readonly type = categoryActionsType.delete;

  constructor(public payload: {
    id: number
  }) { }
}

export class CategoryLoadStateAction implements Action {
  readonly type = categoryActionsType.load;

  constructor(public payload: {
    state: CategoryState
  }) { }
}


export type CategoryActions = CategoryCreateAction | CategoryEditAction | CategoryDeleteAction | CategoryLoadStateAction;