import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { filter } from 'rxjs';
import { CATEGORY_REDUCER_NODE, CategoryState } from '../store/category/category.reducer';
import { categoryListSelector } from '../store/category/category.selector';
import { CategoryLoadStateAction } from '../store/category/category.actions';
export const CATEGORY_LOCALSTORAGE_KEY = "Category-MyTodoNgrxApp";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private isInit = false;

  constructor(private store$: Store<CategoryState>) { }

  public initCategories() {
    if (this.isInit) {
      return;
    }

    this.isInit = true;
    this.loadFromStorage();

    this.store$.pipe(
      select(categoryListSelector),
      filter(state => !!state)
    ).subscribe(state => {
      localStorage.setItem(CATEGORY_LOCALSTORAGE_KEY, JSON.stringify(state))
    })

    window.addEventListener('storage', () => {
      this.loadFromStorage();
    })
  }

  private loadFromStorage() {
    const storageState = localStorage.getItem(CATEGORY_LOCALSTORAGE_KEY);
    if (storageState) {
      this.store$.dispatch(new CategoryLoadStateAction({
        state: JSON.parse(storageState)
      }))
    }
  }


}
