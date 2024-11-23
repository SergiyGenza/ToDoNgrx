import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
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

@Component({
  selector: 'app-todo-widget',
  templateUrl: './todo-widget.component.html',
  styleUrls: ['./todo-widget.component.scss'],
  standalone: true,
  imports: [FormItemComponent, TodoHeaderBarUiComponent, SwipeComponent, CategoryListItemUiComponent,
    TodoListUiComponent, SidebarUiComponent, AsyncPipe, CategoryFilterPipe, TodoPipe]
})
export class TodoWidgetComponent {
  public filters$: Observable<TFilter>;
  public todoList$: Observable<Todo[]>;
  public categoriesList$: Observable<Category[]>;
  public activeCategory$: Observable<Category | null>;
  public openSideBar: boolean = false;

  constructor(
    localStorageService: LocalstorageService,
    private storeService: StoreService,
  ) {
    localStorageService.initTodos();

    this.filters$ = this.storeService.getStoreFilters();
    this.activeCategory$ = this.storeService.getStoreActiveCategory();
    this.categoriesList$ = this.storeService.getStoreCategoriesList();

    this.todoList$ = combineLatest([
      this.filters$,
      this.storeService.getStoreTodoList()
    ]).pipe(
      map(([filters, todos]) => this.applyFilters(filters, todos))
    )
  }

  public onTodoCreate(todo: TodoCreate): void {
    this.storeService.todoCreate(todo);
  }

  public onFolderCreate(folder: FolderCreate): void {
    this.storeService.folderCreate(folder);
  }

  public onCategoryCreate(category: CategoryCreate): void {
    this.storeService.categoryCreate(category);
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
