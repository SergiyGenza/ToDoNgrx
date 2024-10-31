import { Component, Input } from '@angular/core';
import { Todo } from '../../common/models/todo.model';
import { ActionsService } from '../../common/services/actions.service';
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
    private actionsService: ActionsService,
  ) { }

  public toogleTodo(id: number): void {
    this.actionsService.todoToggle(id);
  }
}
