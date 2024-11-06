import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TodoState } from '../../store/todo/todo.reducer';
import { Todo, TodoCreate } from '../models/todo.model';
import { Folder, FolderCreate } from '../models/folder.model';
import { Category, CategoryCreate } from '../models/category.model';
import { TPriority } from '../models/priority.model';
import {
  ChangeActiveCategory,
  ChangeTodoPriority, TodoCategoryCreateAction, TodoCategoryEditAction, TodoCategoryFolderCreateAction, TodoCreateAction, TodoDeleteAction, TodoDeleteCategoryAction,
  TodoDeleteCategoryWithAllItemsAction, TodoDeleteFolderAction, TodoDeleteFolderWithAllItemsAction, TodoEditAction, TodoEditFolderAction, TodoToggleAction, ToggleTodoFavouriteStatus,
  ToogleFavouriteFilter,
  ToogleProirityFilter,
  ToogleStatusFilter
} from '../../store/todo/todo.actions';
import { activeCategorySelector, categoriesListSelector, filtersSelector, todoListSelector } from '../../store/todo/todo.selectors';
import { Observable } from 'rxjs';
import { TFilter } from '../models/filters.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(
    private todoStore$: Store<TodoState>,
  ) { }

  // get store items

  public getStoreTodoList(): Observable<Todo[]> {
    return this.todoStore$.pipe(select(todoListSelector))
  }

  public getStoreCategoriesList(): Observable<Category[]> {
    return this.todoStore$.pipe(select(categoriesListSelector));
  }

  public getStoreActiveCategory(): Observable<Category | null> {
    return this.todoStore$.pipe(select(activeCategorySelector));
  }

  public getStoreFilters(): Observable<TFilter> {
    return this.todoStore$.pipe(select(filtersSelector));
  }

  // store actions

  // need ref
  public todoCreate(item: TodoCreate): void {
    const { name, currentFolderId, currentCategoryId, date } = item;
    this.todoStore$.dispatch(new TodoCreateAction({ name, currentCategoryId, currentFolderId, date }));
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

  public todoFavouriteStatusToggle(id: number): void {
    this.todoStore$.dispatch(new ToggleTodoFavouriteStatus({ id }));
  }

  public categoryPick(activeCategory: Category | null): void {
    this.todoStore$.dispatch(new ChangeActiveCategory({ activeCategory }));
  }

  public favouriteFilterToogle(): void {
    this.todoStore$.dispatch(new ToogleFavouriteFilter());
  }

  public priorityFilterToggle(): void {
    this.todoStore$.dispatch(new ToogleProirityFilter());
  }

  public statusFilterToggle() {
    this.todoStore$.dispatch(new ToogleStatusFilter());
  }
}
