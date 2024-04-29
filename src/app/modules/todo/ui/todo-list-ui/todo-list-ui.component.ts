import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-list-ui',
  templateUrl: './todo-list-ui.component.html',
  styleUrls: ['./todo-list-ui.component.scss']
})
export class TodoListUiComponent {
  edits: number[] = [];

  @Input() todoList: Todo[] | null = [];
  @Output() deleteItem = new EventEmitter<number>();
  @Output() toggle = new EventEmitter<number>();
  @Output() edit = new EventEmitter<{ id: number, name: string }>();


  onEditMode(id: number) {
    this.edits.push(id);
  }

  onToggle(id: number) {
    this.toggle.emit(id);
  }

  onDelete(id: number) {
    this.deleteItem.emit(id);
  }

  onEdit(name: string, id: number) {
    this.edits = this.edits.filter(item => item !== id);
    this.edit.emit({ id, name })
  }

}
