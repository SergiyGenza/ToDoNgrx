import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { CategoryFilterPipe } from '../../common/pipes/category/category-filter.pipe';
import { TodoPipe } from '../../common/pipes/todo/todo.pipe';
import { Store, select } from '@ngrx/store';
import { TodoState } from '../../store/todo/todo.reducer';
import { ToogleFavouriteFilter } from '../../store/todo/todo.actions';
import { categoriesListSelector, filtersSelector, todoListSelector } from '../../store/todo/todo.selectors';
import { combineLatest, map, Observable } from 'rxjs';
import { LocalstorageService } from '../../common/services/localstorage.service';
import { ActionsService } from '../../common/services/actions.service';
import { FormItemComponent } from '../../../shared/forms/form-item/form-item.component';
import { TodoHeaderBarUiComponent } from '../../ui/todo-header-bar-ui/todo-header-bar-ui.component';
import { CategoryListItemUiComponent } from '../../ui/category-list-item-ui/category-list-item-ui.component';
import { SwipeComponent } from '../../ui/swipe/swipe.component';
import { TodoListUiComponent } from '../../ui/todo-list-ui/todo-list-ui.component';
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
    TodoListUiComponent, AsyncPipe, CategoryFilterPipe, TodoPipe]
})
export class TodoWidgetComponent {
  public todoList$: Observable<Todo[]>;
  public categoriesList$: Observable<Category[]>;
  public currentCategory: Category | null;
  public filters: Observable<TFilter>;

  constructor(
    private todoStore$: Store<TodoState>,
    private localStorageService: LocalstorageService,
    private actionsService: ActionsService,
  ) {
    localStorageService.initTodos();
    this.currentCategory = localStorageService.loadCurrentCategoryFromStorage();

    this.filters = this.todoStore$.pipe(select(filtersSelector));
    this.todoList$ = combineLatest([
      this.filters,
      this.todoStore$.pipe(select(todoListSelector))
    ]).pipe(
      map(([filters, todos]) => this.applyFilters(filters, todos))
    )
    this.categoriesList$ = this.todoStore$.pipe(select(categoriesListSelector));
  }

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

  public onFavouriteToggle(favourite: boolean) {
    console.log(favourite);
    this.todoStore$.dispatch(new ToogleFavouriteFilter({ favourite }));
  }

  private applyFilters(filters: TFilter, todos: Todo[]): Todo[] {
    if (todos.length) {
      let filteredTodos: Todo[] = todos;
      if (filters.favourite) {
        filteredTodos = filteredTodos.filter(todo => todo.favourite);
      }
      if (filters.priority) {
        const priorityOrder: { [key in TPriority]: number } = {
          none: 0,
          low: 1,
          medium: 2,
          high: 3,
        };
        filteredTodos.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
      }
      return filteredTodos;
    }
    return todos;
  }

}
