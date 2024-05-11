import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { TodoState } from '../store/todo/todo.reducer';
import { todoFeatureSelector } from '../store/todo/todo.selectors';
import { filter } from 'rxjs';
import { TodoLoadStateAction } from '../store/todo/todo.actions';

export const TODO_LOCALSTORAGE_KEY = "MyTodoNgrxApp";

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
}
