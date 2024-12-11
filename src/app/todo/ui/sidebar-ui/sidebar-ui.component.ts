import { Component, Input } from '@angular/core';
import { Category } from '../../common/models/category.model';
import { TFilter } from '../../common/models/filters.model';
import { StoreService } from '../../common/services/store.service';
import { NgClass } from '@angular/common';
import { SvgIconComponent } from 'angular-svg-icon';
import { FirebaseService } from '../../common/services/firebase.service';
import { TodoState } from '../../store/todo/todo.reducer';
import { Store } from '@ngrx/store';
import { GetDataFromFirebase, ToogleProirityFilterF } from '../../store/todo/todo.actions';

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
    private todoStore$: Store<TodoState>,
    private storeService: StoreService,
    private firebaseService: FirebaseService
  ) { }

  // або змінювати значення фільтра у методі і тоді передавати саме значення вперед

  public onPriorityFilterToggle(filters: TFilter): void {
    this.storeService.priorityFilterToggle(filters);

    this.todoStore$.dispatch(ToogleProirityFilterF());
  }

  public onStatusFilterToggle(filters: TFilter): void {
    this.storeService.statusFilterToggle();
    // this.firebaseService.statusFilterToggle(filters)
  }

  public onFavouriteFilterToggle(): void {
    this.storeService.favouriteFilterToogle();
    // this.firebaseService.favouriteFilterToogle(filters)
  }

  public onAlphabeticalSortFilterToggle(filters: TFilter): void {
    this.storeService.alphabeticalSortFilterToggle();
    // this.firebaseService.alphabeticalSortFilterToggle(filters)
  }

  public onCategoryPick(activeCategory: Category | null): void {
    if (this.filters?.favourite) this.onFavouriteFilterToggle();
    this.storeService.categoryPick(activeCategory);
  }
}
