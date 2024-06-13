import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../common/models/todo.model';

@Component({
  selector: 'app-todo-list-ui',
  templateUrl: './todo-list-ui.component.html',
  styleUrls: ['./todo-list-ui.component.scss']
})
export class TodoListUiComponent {
  edits: number[] = [];
  isEdit: boolean = false;
  @Input() todoList: Todo[] | null | undefined = [];
  @Output() deleteItem = new EventEmitter<number>();
  @Output() toggle = new EventEmitter<number>();
  @Output() edit = new EventEmitter<{ id: number, name: string }>();

  constructor() { }

  public onEditMode(id: number) {
    // need check 
    this.edits.push(id);
    this.isEdit = this.edits.includes(id);
  }

  public onToggle(id: number) {
    this.toggle.emit(id);
  }

  public onDelete(id: number) {
    this.deleteItem.emit(id);
  }

  checkDeleteOnSwipe(id: any) {
    this.deleteItem.emit(id);
  }

  public onEdit(name: string, id: number) {
    this.edits = this.edits.filter(item => item !== id);
    this.isEdit = false;
    this.edit.emit({ id, name });
  }
}
