import { Component, Input, OnChanges } from '@angular/core';
import { Category } from '../../common/models/category.model';
import { Todo } from '../../common/models/todo.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-list-item-ui',
  templateUrl: './category-list-item-ui.component.html',
  styleUrls: ['./category-list-item-ui.component.scss']
})
export class CategoryListItemUiComponent implements OnChanges {
  @Input() currentCategory!: Category | null ;
  @Input() category!: Category;
  @Input() todoList$: Observable<Todo[]> | undefined;

  public showContent: boolean = true;
  public showHeader: boolean = false;

  constructor() { }

  ngOnChanges(): void {
    this.showHeader = this.currentCategory !== null;
  }
}
