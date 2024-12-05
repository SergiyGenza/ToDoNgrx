import { Component, Input } from '@angular/core';
import { Category } from '../../common/models/category.model';
import { TFilter } from '../../common/models/filters.model';
import { NgClass } from '@angular/common';
import { SvgIconComponent } from 'angular-svg-icon';
import { StoreService } from '../../common/services/store.service';

@Component({
  selector: 'app-mobile-header',
  standalone: true,
  imports: [NgClass, SvgIconComponent],
  templateUrl: './mobile-header.component.html',
  styleUrl: './mobile-header.component.scss'
})
export class MobileHeaderComponent {
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
