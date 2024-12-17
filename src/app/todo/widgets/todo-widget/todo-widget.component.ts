import { Component, HostListener, inject } from '@angular/core';
import { AsyncPipe, NgClass } from '@angular/common';
import { combineLatest, map, Observable } from 'rxjs';
import { LocalstorageService } from '../../common/services/localstorage.service';
import { StoreService } from '../../common/services/store.service';
import { CategoryFilterPipe } from '../../common/pipes/category/category-filter.pipe';
import { TodoPipe } from '../../common/pipes/todo/todo.pipe';
import { FormItemComponent } from 'src/app/shared/forms/form-item/form-item.component';
import { TodoHeaderBarUiComponent } from '../../ui/todo-header-bar-ui/todo-header-bar-ui.component';
import { CategoryListItemUiComponent } from '../../ui/category-list-item-ui/category-list-item-ui.component';
import { SwipeComponent } from '../../ui/swipe/swipe.component';
import { TodoListUiComponent } from '../../ui/todo-list-ui/todo-list-ui.component';
import { SidebarUiComponent } from '../../ui/sidebar-ui/sidebar-ui.component';
import { Category, CategoryCreate } from '../../common/models/category.model';
import { Todo, TodoCreate } from '../../common/models/todo.model';
import { FolderCreate } from '../../common/models/folder.model';
import { TFilter } from '../../common/models/filters.model';
import { TPriority } from '../../common/models/priority.model';
import { MobileControlsComponent } from '../../ui/mobile-controls/mobile-controls.component';
import { MobileHeaderComponent } from '../../ui/mobile-header/mobile-header.component';
import { FirebaseService } from '../../common/services/firebase.service';
import { user, User } from '@angular/fire/auth';
import { AuthService } from 'src/app/auth/services/auth.service';
import { testData, testFireData } from 'src/test.data';
import { GetDataFromFirebase } from '../../store/todo/todo.actions';
import { TodoState } from '../../store/todo/todo.reducer';
import { Store } from '@ngrx/store';

// const data = testData;
const data = testFireData;

@Component({
  selector: 'app-todo-widget',
  templateUrl: './todo-widget.component.html',
  styleUrls: ['./todo-widget.component.scss'],
  standalone: true,
  imports: [FormItemComponent, TodoHeaderBarUiComponent, SwipeComponent, CategoryListItemUiComponent,
    TodoListUiComponent, SidebarUiComponent, MobileControlsComponent, MobileHeaderComponent, AsyncPipe, CategoryFilterPipe, TodoPipe, NgClass]
})
export class TodoWidgetComponent {
  public filters$: Observable<TFilter>;
  public todoList$: Observable<Todo[]>;
  public categoriesList$: Observable<Category[]>;
  public activeCategory$: Observable<Category | null>;
  public openSideBar: boolean = false;
  public openMobileControls: boolean = false;
  public openMobileForm: boolean = false;

  private authService = inject(AuthService);
  private userId!: string | null | undefined;


  constructor(
    // localStorageService: LocalstorageService,
    private storeService: StoreService,
    private firebaseService: FirebaseService,
    public todoStore$: Store<TodoState>,
  ) {
    // localStorageService.initTodos();

    this.filters$ = this.storeService.getStoreFilters();
    // this.activeCategory$ = this.storeService.getStoreActiveCategory();
    // this.categoriesList$ = this.storeService.getStoreCategoriesList();
    this.activeCategory$ = this.storeService.getStoreActiveCategory();
    this.categoriesList$ = this.firebaseService.getFireCategories()
      .pipe(
        map((categories: { [key: string]: Category }) => {
          return Object.keys(categories).map(key => {
            const category = categories[key];
            if (category.foldersList && typeof category.foldersList === 'object') {
              category.foldersList = Object.keys(category.foldersList)
                .map((folderKey: any) => category.foldersList[folderKey]);
            }
            return category;
          });
        })
      );

    this.todoList$ = combineLatest([
      this.filters$,
      // this.storeService.getStoreTodoList()
      this.firebaseService.getFireTodo()
        .pipe(
          map((todo: { [key: string]: Todo }) => {
            if (todo) return Object.keys(todo).map(key => todo[key])
            else return []
          })
        )
    ]).pipe(
      map(([filters, todos]) => this.applyFilters(filters, todos))
    )
  }

  testFireCategories!: Observable<Category[]>;
  testFireTodos!: Observable<Todo[]>

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => this.userId = user?.uid);
    this.checkScreenWidth();
    this.storeService.getAllUsersData();

    // this.testFireCategories = 
    // this.firebaseService.getFireCategories()
    //   .pipe(
    //     map((categories: { [key: string]: Category }) => {
    //       return Object.keys(categories).map(key => categories[key]);
    //     })
    //   ).subscribe((s) => console.log(s))

    // this.testFireTodos = 
    // this.firebaseService.getFireTodo()
    //   .pipe(
    //     map((todo: { [key: string]: Todo }) => {
    //       return Object.keys(todo).map(key => todo[key]);
    //     })
    //   ).subscribe((s) => console.log(s))
  }

  save() {
    this.firebaseService.saveTestData(data);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkScreenWidth();
  }

  checkScreenWidth() {
    const isMobile = window.innerWidth > 768;
    this.openMobileControls = !isMobile;
    this.openMobileForm = isMobile;
    // this.openFormMobile = isMobile;
    // this.isCategoryPickMobile = isMobile;
  }

  public onTodoCreate(todo: TodoCreate): void {
    // this.storeService.todoCreate(todo);
    // this.firebaseService.createTodo(todo)
    this.firebaseService.createFireTodo(todo)

  }

  public onFolderCreate(folder: FolderCreate): void {
    // this.storeService.folderCreate(folder);
    this.firebaseService.createFireFolder(folder);
  }

  public onCategoryCreate(category: CategoryCreate): void {
    // this.storeService.categoryCreate(category);
    this.firebaseService.createFireCategory(category)
  }

  private applyFilters(filters: TFilter, todos: Todo[]): Todo[] {
    if (todos.length) {
      let filteredTodos: Todo[] = todos;
      if (filters.status) filteredTodos = filteredTodos.filter(todo => !todo.completed);
      if (filters.favourite) filteredTodos = filteredTodos.filter(todo => todo.favourite);
      if (filters.priority) {
        const priorityOrder: { [key in TPriority]: number } = {
          none: 0,
          low: 1,
          medium: 2,
          high: 3,
        };
        filteredTodos = [...filteredTodos].sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
      }
      if (filters.alphabeticalSort) {
        filteredTodos = [...filteredTodos].sort((a, b) => a.name.localeCompare(b.name));
      }
      return filteredTodos;
    }
    return todos;
  }

}
