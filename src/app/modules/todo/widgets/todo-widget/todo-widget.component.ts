import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { TodoState } from '../../store/todo/todo.reducer';
import { categoriesListSelector, todoListSelector } from '../../store/todo/todo.selectors';
import { Observable } from 'rxjs';
import { Todo } from '../../common/models/todo.model';
import { Category } from '../../common/models/category.model';
import { CreateItem } from '../../common/models/create-item.model';
import { LocalstorageService } from '../../common/services/localstorage.service';
import { ActionsService } from '../../common/services/actions.service';

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
    private actionsService: ActionsService,
  ) {
    localStorageService.initTodos();
    this.currentCategory = localStorageService.loadCurrentCategoryFromStorage();
    this.todoList$ = this.todoStore$.pipe(select(todoListSelector));
    this.categoriesList$ = this.todoStore$.pipe(select(categoriesListSelector));
  }

  public onItemCreate(createItem: CreateItem): void {
    const { type } = createItem;
    switch (type) {
      case 'todo':
        return this.actionsService.todoCreate(createItem);
      case 'folder':
        return this.actionsService.folderCreate(createItem);
      case 'category':
        return this.actionsService.categoryCreate(createItem);
    }
  }

  public onCategoryPick(pickedCategory: string): void {
    this.currentCategory = pickedCategory;
    this.localStorageService.setCurrentCategoryInLocalstorage(pickedCategory);
  }
}
