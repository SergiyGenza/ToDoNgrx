import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { Category } from '../../common/models/category.model';
import { LocalstorageService } from '../../common/services/localstorage.service';
import { DOCUMENT, NgClass } from '@angular/common';
import { SvgIconComponent } from 'angular-svg-icon';
import { TFilter } from '../../common/models/filters.model';

@Component({
  selector: 'app-todo-header-bar-ui',
  templateUrl: './todo-header-bar-ui.component.html',
  styleUrls: ['./todo-header-bar-ui.component.scss'],
  standalone: true,
  imports: [NgClass, SvgIconComponent]
})
export class TodoHeaderBarUiComponent {
  @Input()
  categoriesList?: Category[] | null;
  @Input()
  currentCategory?: Category | null;
  @Input()
  filters!: TFilter | null;
  @Output()
  currentCategoryEmmiter = new EventEmitter<Category | null>();
  @Output()
  showFavouriteEmmiter = new EventEmitter();

  // need ref
  constructor(
    private localStorageService: LocalstorageService,
    @Inject(DOCUMENT) private _document: Document,
  ) { }

  public onCategoryPick(catagory: Category): void {
    this.currentCategory = catagory;
    this.currentCategoryEmmiter.emit(catagory);
  }

  public onAllCategoriesPick(): void {
    this.currentCategory = null;
    this.currentCategoryEmmiter.emit(null);
  }

  // reload page after data delete
  public clearAllData(): void {
    this.localStorageService.clearAllData();
    this._document.defaultView!.location.reload();
  }

  public toogleFavouriteFilter(): void  {
    this.showFavouriteEmmiter.emit(!this.filters?.favourite);
  }
}
