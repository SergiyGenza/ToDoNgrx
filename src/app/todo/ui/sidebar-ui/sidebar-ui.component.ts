import { Component, Input } from '@angular/core';
import { Category } from '../../common/models/category.model';
import { TFilter } from '../../common/models/filters.model';
import { StoreService } from '../../common/services/store.service';
import { NgClass } from '@angular/common';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-sidebar-ui',
  standalone: true,
  imports: [NgClass, SvgIconComponent],
  templateUrl: './sidebar-ui.component.html',
  styleUrl: './sidebar-ui.component.scss'
})
export class SidebarUiComponent {
  @Input()
  categoriesList?: Category[] | null;
  @Input()
  activeCategory!: Category | null;
  @Input()
  filters!: TFilter | null;

  public openFilters: boolean = false;
  public openCategoriesList: boolean = false;

  constructor(
    private storeService: StoreService
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

  public onAlphabeticalSortFilterToggle(): void {
    this.storeService.alphabeticalSortFilterToggle();
  }

  public onCategoryPick(activeCategory: Category | null): void {
    if (this.filters?.favourite) this.onFavouriteFilterToggle();
    this.storeService.categoryPick(activeCategory);
  }
}
