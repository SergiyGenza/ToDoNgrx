import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../common/models/category.model';

@Component({
  selector: 'app-todo-header-bar-ui',
  templateUrl: './todo-header-bar-ui.component.html',
  styleUrls: ['./todo-header-bar-ui.component.scss']
})
export class TodoHeaderBarUiComponent {
  @Input() categoriesList?: Category[] | null;
  @Input() currentCategory?: string;
  @Output() currentCategoryEmmiter = new EventEmitter<string>();

  constructor() { }

  public onCategoryPick(catagory: Category): void {
    this.currentCategory = catagory.name;
    this.currentCategoryEmmiter.emit(catagory.name);
  }

  public onAllCategoriesPick(): void {
    this.currentCategory = 'all';
    this.currentCategoryEmmiter.emit('all');
  }
}
