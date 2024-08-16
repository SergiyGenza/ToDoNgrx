import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { TodoState } from '../../store/todo/todo.reducer';
import { categoriesListSelector, todoListSelector } from '../../store/todo/todo.selectors';
import { Observable } from 'rxjs';
import { Todo, TodoCreate } from '../../common/models/todo.model';
import { Category, CategoryCreate } from '../../common/models/category.model';
// import { CreateItem } from '../../common/models/create-item.model';
import { LocalstorageService } from '../../common/services/localstorage.service';
import { ActionsService } from '../../common/services/actions.service';
import { FolderCreate } from '../../common/models/folder.model';

@Component({
  selector: 'app-todo-widget',
  templateUrl: './todo-widget.component.html',
  styleUrls: ['./todo-widget.component.scss']
})
export class TodoWidgetComponent {
  public todoList$: Observable<Todo[]>;
  public categoriesList$: Observable<Category[]>;
  public currentCategory: Category | null;

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

  // need ref
  // public onItemCreate(createItem: CreateItem): void {
  //   const { type } = createItem;
  //   switch (type) {
  //     case 'todo':
  //       return 
  //     case 'folder':
  //       return
  //     case 'category':
  //       return
  //   }
  // }

  public onTodoCreate(todo: TodoCreate) {
    this.actionsService.todoCreate(todo);
  }

  public onFolderCreate(folder: FolderCreate) {
    this.actionsService.folderCreate(folder);
  }

  public onCategoryCreate(category: CategoryCreate) {
    this.actionsService.categoryCreate(category);
  }

  public onCategoryPick(pickedCategory: Category | null): void {
    this.currentCategory = pickedCategory
    pickedCategory
      ? this.localStorageService.setCurrentCategoryInLocalstorage(pickedCategory)
      : this.localStorageService.setCurrentCategoryInLocalstorage(null);
  }
}
