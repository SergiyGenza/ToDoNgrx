import { Component, Input } from '@angular/core';
import { Todo } from '../../common/models/todo.model';

@Component({
  selector: 'app-todo-list-ui',
  templateUrl: './todo-list-ui.component.html',
  styleUrls: ['./todo-list-ui.component.scss']
})
export class TodoListUiComponent {
  @Input() todoList: Todo[] | null | undefined = [];

  constructor() { }
}
