import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-list-ui',
  templateUrl: './todo-list-ui.component.html',
  styleUrls: ['./todo-list-ui.component.scss']
})
export class TodoListUiComponent {
  @Input() todoList: Todo[] | null = [];
  @Output() deleteItem = new EventEmitter<number>();
  @Output() toggle = new EventEmitter<number>();

  constructor() {

  }


  onToggle(event: Event, id: number) {
    event.preventDefault();
    this.toggle.emit(id);
  }

  onDelete(id: number) {
    this.deleteItem.emit(id);
  }



}
