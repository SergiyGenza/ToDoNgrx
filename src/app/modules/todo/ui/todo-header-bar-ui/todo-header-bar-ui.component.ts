import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../common/models/category.model';

@Component({
  selector: 'app-todo-header-bar-ui',
  templateUrl: './todo-header-bar-ui.component.html',
  styleUrls: ['./todo-header-bar-ui.component.scss']
})
export class TodoHeaderBarUiComponent {
  @Input() categoriesList?: Category[] | null;
  @Input() currentCategory?: Category | null;
  @Output() currentCategoryEmmiter = new EventEmitter<Category | null>();

  constructor() { }

  public onCategoryPick(catagory: Category): void {
    this.currentCategory = catagory;
    this.currentCategoryEmmiter.emit(catagory);
  }

  public onAllCategoriesPick(): void {
    this.currentCategory = null;
    this.currentCategoryEmmiter.emit(null);
  }
}
