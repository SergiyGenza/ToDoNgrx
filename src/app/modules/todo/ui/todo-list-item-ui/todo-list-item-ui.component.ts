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

  public onToggle() {
    this.toggle.emit();
  }

  public onDelete() {
    this.deleteItem.emit();
  }

  public onEdit() {
    this.edit.emit()
  }

}
