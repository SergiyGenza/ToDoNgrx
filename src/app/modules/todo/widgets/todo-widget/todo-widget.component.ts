import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { TodoState } from '../../store/todo/todo.reducer';
import { TodoCategoryCreateAction, TodoCategoryFolderCreateAction, TodoCreateAction } from '../../store/todo/todo.actions';
import { categoriesListSelector, todoListSelector } from '../../store/todo/todo.selectors';
import { Observable } from 'rxjs';
import { Todo } from '../../common/models/todo.model';
import { Category } from '../../common/models/category.model';
import { CreateItem } from '../../common/models/create-item.model';
import { LocalstorageService } from '../../common/services/localstorage.service';

@Component({
  selector: 'app-todo-widget',
  templateUrl: './todo-widget.component.html',
  styleUrls: ['./todo-widget.component.scss']
})
export class TodoWidgetComponent {
  public todoList$: Observable<Todo[]>;
  public categoriesList$: Observable<Category[]>;
  public currentCategory: string;

  constructor(
    private todoStore$: Store<TodoState>,
    private localStorageService: LocalstorageService,
  ) {
    localStorageService.initTodos();
    this.currentCategory = localStorageService.loadCurrentCategoryFromStorage();
    this.todoList$ = this.todoStore$.pipe(select(todoListSelector));
    this.categoriesList$ = this.todoStore$.pipe(select(categoriesListSelector));
  }

  public onItemCreate(createItem: CreateItem): void {
    const { name, type, currentFolderName, currentCategoryName } = createItem;
    switch (type) {
      case 'todo':
        return this.todoStore$.dispatch(new TodoCreateAction({ name, currentCategoryName, currentFolderName }));
      case 'folder':
        let categoryName = currentCategoryName;
        let folderName = name;
        return this.todoStore$.dispatch(new TodoCategoryFolderCreateAction({ categoryName, folderName }));
      case 'category':
        return this.todoStore$.dispatch(new TodoCategoryCreateAction({ name }));
    }
  }

  public onCategoryPick(pickedCategory: string): void {
    this.currentCategory = pickedCategory;
    this.localStorageService.setCurrentCategoryInLocalstorage(pickedCategory);
  }
}
