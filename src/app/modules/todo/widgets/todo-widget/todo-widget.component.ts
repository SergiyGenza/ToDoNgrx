import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { TodoState } from '../../store/todo/todo.reducer';
import { categoriesListSelector, todoListSelector } from '../../store/todo/todo.selectors';
import { Observable } from 'rxjs';
import { Todo, TodoCreate } from '../../common/models/todo.model';
import { Category, CategoryCreate } from '../../common/models/category.model';
import { LocalstorageService } from '../../common/services/localstorage.service';
import { ActionsService } from '../../common/services/actions.service';
import { FolderCreate } from '../../common/models/folder.model';
import { FirebaseService } from '../../common/services/firebase.service';
import { CreateFolderAction, LoadCategories, LoadTodos, TodoCreateAction } from '../../store/todo/todo.actions';

@Component({
  selector: 'app-todo-widget',
  templateUrl: './todo-widget.component.html',
  styleUrls: ['./todo-widget.component.scss']
})
export class TodoWidgetComponent implements OnInit {
  public todoList$: Observable<Todo[]>;
  public categoriesList$: Observable<Category[]>;
  public currentCategory: Category | null;

  constructor(
    private todoStore$: Store<TodoState>,
    private localStorageService: LocalstorageService,
    private actionsService: ActionsService,
    private firebaseService: FirebaseService,
  ) {
    localStorageService.initTodos();
    this.currentCategory = localStorageService.loadCurrentCategoryFromStorage();
    this.todoList$ = this.todoStore$.pipe(select(todoListSelector));
    this.categoriesList$ = this.todoStore$.pipe(select(categoriesListSelector));
  }

  ngOnInit(): void {
    this.todoStore$.dispatch(new LoadTodos());
    // this.todoList$.subscribe(s => console.log(s))
    this.todoStore$.dispatch(new LoadCategories());
    this.firebaseService.getAllCategories().subscribe(s => console.log(s)
    )
  }

  public onTodoCreate(todo: TodoCreate) {
    console.log(todo);

    this.actionsService.todoCreate(todo);
    // this.firebaseService.addTodo(todo);
    this.todoStore$.dispatch(new TodoCreateAction({ todo }))
  }

  public onFolderCreate(folder: FolderCreate) {
    // this.actionsService.folderCreate(folder);
    // this.firebaseService.addFolder(folder, folder.currentCategoryId!)
    const { currentCategoryId } = folder;
    if (currentCategoryId)
      this.todoStore$.dispatch(new CreateFolderAction({ folder, currentCategoryId }));

  }

  public onCategoryCreate(category: CategoryCreate) {
    this.actionsService.categoryCreate(category);
    this.firebaseService.addCategory(category);
  }

  public onCategoryPick(pickedCategory: Category | null): void {
    this.currentCategory = pickedCategory
    pickedCategory
      ? this.localStorageService.setCurrentCategoryInLocalstorage(pickedCategory)
      : this.localStorageService.setCurrentCategoryInLocalstorage(null);
  }
}
