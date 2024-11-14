import { Component, Input } from '@angular/core';
import { Todo } from '../../common/models/todo.model';
import { StoreService } from '../../common/services/store.service';
import { SwipeComponent } from '../swipe/swipe.component';
import { TodoListItemUiComponent } from '../todo-list-item-ui/todo-list-item-ui.component';

@Component({
  selector: 'app-todo-list-ui',
  templateUrl: './todo-list-ui.component.html',
  styleUrls: ['./todo-list-ui.component.scss'],
  standalone: true,
  imports: [SwipeComponent, TodoListItemUiComponent]
})
export class TodoListUiComponent {
  @Input() todoList: Todo[] | null | undefined = [];

  constructor(
    private storeService: StoreService
  ) { }

  public toogleTodo(id: number): void {
    this.storeService.todoToggle(id);
  }
}
