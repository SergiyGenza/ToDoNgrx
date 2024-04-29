import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-list-item-ui',
  templateUrl: './todo-list-item-ui.component.html',
  styleUrls: ['./todo-list-item-ui.component.scss']
})
export class TodoListItemUiComponent {
  @Input() todo: Todo | undefined;
  @Output() deleteItem = new EventEmitter<void>();
  @Output() toggle = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();

  onToggle() {
    this.toggle.emit();
  }

  onDelete() {
    this.deleteItem.emit();
  }

  onEdit() {
    this.edit.emit()
  }

}
