import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TodoState } from '../../store/todo/todo.reducer';
import { TodoCategoryCreateAction, TodoCategoryEditAction, TodoCategoryFolderCreateAction, TodoCreateAction, TodoDeleteAction, TodoDeleteCategoryAction, TodoDeleteCategoryWithAllItemsAction, TodoDeleteFolderAction, TodoDeleteFolderWithAllItemsAction, TodoEditAction, TodoEditFolderAction } from '../../store/todo/todo.actions';
import { Todo } from '../models/todo.model';
import { Folder } from '../models/folder.model';
import { Category } from '../models/category.model';
import { CreateItem } from '../models/create-item.model';

@Injectable({
  providedIn: 'root'
})
export class ActionsService {

  constructor(
    private todoStore$: Store<TodoState>,
  ) { }

  // need ref
  public todoCreate(item: CreateItem): void {
    const { name, currentFolderName, currentCategoryName } = item;
    this.todoStore$.dispatch(new TodoCreateAction({ name, currentCategoryName, currentFolderName }));
  }

  public todoEdit(item: Todo): void {
    const { id, name } = item;
    this.todoStore$.dispatch(new TodoEditAction({ id, name }));
  }

  public todoDelete(item: Todo): void {
    const { id } = item;
    this.todoStore$.dispatch(new TodoDeleteAction({ id }));
  }

  // need ref
  public categoryCreate(item: CreateItem): void {
    const { name } = item;
    this.todoStore$.dispatch(new TodoCategoryCreateAction({ name }));
  }

  public categoryEdit(item: Category): void {
    const { id, name } = item;
    this.todoStore$.dispatch(new TodoCategoryEditAction({ id, name }));
  }

  public deleteCategoryWithAllItems(item: Category) {
    const { id, name } = item;
    this.todoStore$.dispatch(new TodoDeleteCategoryWithAllItemsAction({ id, name }));
  }

  public deleteCategoryAction(item: Category) {
    const { id, name } = item;
    this.todoStore$.dispatch(new TodoDeleteCategoryAction({ id, name }));
  }

  // need ref
  public folderCreate(item: CreateItem): void {
    const { name, currentCategoryName } = item;
    let categoryName = currentCategoryName;
    let folderName = name;
    this.todoStore$.dispatch(new TodoCategoryFolderCreateAction({ categoryName, folderName }));
  }

  public folderEdit(item: Folder): void {
    const { id, name } = item;
    this.todoStore$.dispatch(new TodoEditFolderAction({ id, name }));
  }

  public deleteFolderWithAllItems(item: Folder) {
    const { id, name } = item;
    this.todoStore$.dispatch(new TodoDeleteFolderWithAllItemsAction({ id, name }));
  }

  public deleteFolderAction(item: Folder) {
    const { id, name } = item;
    this.todoStore$.dispatch(new TodoDeleteFolderAction({ id, name }));
  }

}
