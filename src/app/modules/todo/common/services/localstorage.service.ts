import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { filter } from 'rxjs';
import { TodoLoadStateAction } from '../../store/todo/todo.actions';
import { TodoState } from '../../store/todo/todo.reducer';
import { todoFeatureSelector } from '../../store/todo/todo.selectors';
import { Category } from '../models/category.model';

export const TODO_LOCALSTORAGE_KEY = "MyTodoNgrxApp";
export const CURRENT_CATEGORY_LOCALSTOREGE_KEY = "MyTodoNgrxAppCurrentCategory";

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  private isInit = false;

  constructor(private store$: Store<TodoState>) { }

  public initTodos() {
    if (this.isInit) {
      return;
    }

    this.isInit = true;
    this.loadFromStorage();

    this.store$.pipe(
      select(todoFeatureSelector),
      filter(state => !!state)
    ).subscribe(state => {
      localStorage.setItem(TODO_LOCALSTORAGE_KEY, JSON.stringify(state))
    })

    window.addEventListener('storage', () => {
      this.loadFromStorage();
    })
  }

  private loadFromStorage() {
    const storageState = localStorage.getItem(TODO_LOCALSTORAGE_KEY);
    if (storageState) {
      this.store$.dispatch(new TodoLoadStateAction({
        state: JSON.parse(storageState)
      }))
    }
  }


  public setCurrentCategoryInLocalstorage(currentCategory: Category | null): void {
    localStorage.setItem(CURRENT_CATEGORY_LOCALSTOREGE_KEY, JSON.stringify(currentCategory));
  }

  public loadCurrentCategoryFromStorage(): Category | null {
    const currentCategory = localStorage.getItem(CURRENT_CATEGORY_LOCALSTOREGE_KEY);
    
    if (currentCategory) {
      return JSON.parse(currentCategory)
    } else return null;
  }
}
