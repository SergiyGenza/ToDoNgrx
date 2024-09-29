import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TodoState } from '../../store/todo/todo.reducer';
import { ChangeTodoPriority, TodoCategoryCreateAction, TodoCategoryEditAction, TodoCategoryFolderCreateAction, TodoCreateAction, TodoDeleteAction, TodoDeleteCategoryAction, TodoDeleteCategoryWithAllItemsAction, TodoDeleteFolderAction, TodoDeleteFolderWithAllItemsAction, TodoEditAction, TodoEditFolderAction, TodoToggleAction } from '../../store/todo/todo.actions';
import { Todo, TodoCreate } from '../models/todo.model';
import { Folder, FolderCreate } from '../models/folder.model';
import { Category, CategoryCreate } from '../models/category.model';
import { TPriority } from '../models/priority.model';

@Injectable({
  providedIn: 'root'
})
export class ActionsService {

  constructor(
    private todoStore$: Store<TodoState>,
  ) { }

  // need ref
  public todoCreate(item: TodoCreate): void {
    const { name, currentFolderId, currentCategoryId } = item;
    this.todoStore$.dispatch(new TodoCreateAction({ name, currentCategoryId, currentFolderId }));
  }

  public todoEdit(item: Todo): void {
    const { id, name } = item;
    this.todoStore$.dispatch(new TodoEditAction({ id, name }));
  }

  public todoDelete(item: Todo): void {
    const { id } = item;
    this.todoStore$.dispatch(new TodoDeleteAction({ id }));
  }

  public todoToggle(id: number): void {
    this.todoStore$.dispatch(new TodoToggleAction({ id }));
  }

  // need ref
  public categoryCreate(item: CategoryCreate): void {
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
  public folderCreate(item: FolderCreate): void {
    const { name, currentCategoryId } = item;
    let folderName = name;
    this.todoStore$.dispatch(new TodoCategoryFolderCreateAction({ currentCategoryId, folderName }));
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

  public changeTodoPriority(todo: Todo, priority: TPriority) {
    const { id } = todo;
    this.todoStore$.dispatch(new ChangeTodoPriority({ id, priority }));
  }

}
