import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { StoreService } from '../../common/services/store.service';
import { TFilter } from '../../common/models/filters.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-mobile-controls',
  standalone: true,
  templateUrl: './mobile-controls.component.html',
  styleUrl: './mobile-controls.component.scss',
  imports: [SvgIconComponent, NgClass]
})
export class MobileControlsComponent {
  @Input()
  filters!: TFilter | null;
  @Output()
  openMobileForm = new EventEmitter();
  // @Output() openFilters = new EventEmitter();
  public openFilters: boolean = false;

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
}
