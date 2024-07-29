import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Category } from '../../common/models/category.model';
import { Todo } from '../../common/models/todo.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-list-item-ui',
  templateUrl: './category-list-item-ui.component.html',
  styleUrls: ['./category-list-item-ui.component.scss']
})
export class CategoryListItemUiComponent implements OnChanges {
  @Input() currentCategory: string | undefined;
  @Input() category!: Category;
  @Input() todoList$: Observable<Todo[]> | undefined;

  public showContent: boolean = true;
  public showCreateComponent: boolean = false;
  public showHeader: boolean = false;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.checkCurrentCategory();
  }

  private checkCurrentCategory(): void {
    this.showHeader = this.currentCategory !== 'all';
  }
}
