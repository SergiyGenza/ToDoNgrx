import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { DOCUMENT, NgClass } from '@angular/common';
import { LocalstorageService } from '../../common/services/localstorage.service';
import { SvgIconComponent } from 'angular-svg-icon';
import { Category } from '../../common/models/category.model';
import { TFilter } from '../../common/models/filters.model';
import { StoreService } from '../../common/services/store.service';

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

  public openFilters: boolean = false;

  // need ref
  constructor(
    private storeService: StoreService,
    // need only for testing
    private localStorageService: LocalstorageService,
    @Inject(DOCUMENT) private _document: Document,
    //
  ) { }

  public onPriorityFilterToggle(): void {
    this.storeService.priorityFilterToggle();
  }
  
  public onStatusFilterToggle(): void {
    this.storeService.statusFilterToggle();
  }

  public onFavouriteFilterToggle(): void {
    this.storeService.favouriteFilterToogle();
  }

  public onCategoryPick(activeCategory: Category | null): void {
    if (this.filters?.favourite) this.onFavouriteFilterToggle();
    this.storeService.categoryPick(activeCategory);
  }

  // reload page after data delete
  // need only for testing
  public clearAllData(): void {
    this.localStorageService.clearAllData();
    this._document.defaultView!.location.reload();
  }
}
