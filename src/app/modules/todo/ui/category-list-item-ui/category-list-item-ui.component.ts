import { Component, Input } from '@angular/core';
import { Category } from '../../common/models/category.model';
import { Todo } from '../../common/models/todo.model';
import { Observable } from 'rxjs';
import { SvgIconComponent } from 'angular-svg-icon';
import { NgClass, AsyncPipe } from '@angular/common';
import { TodoListUiComponent } from '../todo-list-ui/todo-list-ui.component';
import { SwipeComponent } from '../swipe/swipe.component';
import { FolderListItemUiComponent } from '../folder-list-item-ui/folder-list-item-ui.component';
import { TodoPipe } from '../../common/pipes/todo/todo.pipe';

@Component({
    selector: 'app-category-list-item-ui',
    templateUrl: './category-list-item-ui.component.html',
    styleUrls: ['./category-list-item-ui.component.scss'],
    standalone: true,
    imports: [SvgIconComponent, NgClass, TodoListUiComponent, SwipeComponent, FolderListItemUiComponent, AsyncPipe, TodoPipe]
})
export class CategoryListItemUiComponent {
  @Input() currentCategory!: Category | null;
  @Input() category!: Category;
  @Input() todoList$: Observable<Todo[]> | undefined;

  public showContent: boolean = true;

  constructor() { }

}
