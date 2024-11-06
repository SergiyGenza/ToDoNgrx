import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { DOCUMENT, NgClass } from '@angular/common';
import { Store } from '@ngrx/store';
import { TodoState } from '../../store/todo/todo.reducer';
import { ChangeActiveCategory, ToogleFavouriteFilter, ToogleProirityFilter, ToogleStatusFilter } from '../../store/todo/todo.actions';
import { LocalstorageService } from '../../common/services/localstorage.service';
import { SvgIconComponent } from 'angular-svg-icon';
import { Category } from '../../common/models/category.model';
import { TFilter } from '../../common/models/filters.model';

@Component({
  selector: 'app-todo-header-bar-ui',
  templateUrl: './todo-header-bar-ui.component.html',
  styleUrls: ['./todo-header-bar-ui.component.scss'],
  standalone: true,
  imports: [NgClass, SvgIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoHeaderBarUiComponent {
  @Input()
  categoriesList?: Category[] | null;
  @Input()
  activeCategory!: Category | null;
  @Input()
  filters!: TFilter | null;

  constructor(
    private todoStore$: Store<TodoState>,
    // need only for testing
    private localStorageService: LocalstorageService,
    @Inject(DOCUMENT) private _document: Document,
    //
  ) { }

  public onCategoryPick(activeCategory: Category | null): void {
    if (this.filters?.favourite) this.todoStore$.dispatch(new ToogleFavouriteFilter());
    this.todoStore$.dispatch(new ChangeActiveCategory({ activeCategory }));
  }

  public onFavouriteFilterToggle(): void {
    this.todoStore$.dispatch(new ToogleFavouriteFilter());
  }

  public onPriorityFilterToggle(): void {
    this.todoStore$.dispatch(new ToogleProirityFilter());
  }

  public onStatusFilterToggle(): void {
    this.todoStore$.dispatch(new ToogleStatusFilter());
  }

  // reload page after data delete
  // need only for testing
  public clearAllData(): void {
    this.localStorageService.clearAllData();
    this._document.defaultView!.location.reload();
  }
}
