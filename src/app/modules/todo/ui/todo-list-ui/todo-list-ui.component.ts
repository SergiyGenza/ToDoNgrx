import { Component, Input } from '@angular/core';
import { Todo } from '../../common/models/todo.model';
import { ActionsService } from '../../common/services/actions.service';

@Component({
  selector: 'app-todo-list-ui',
  templateUrl: './todo-list-ui.component.html',
  styleUrls: ['./todo-list-ui.component.scss']
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
