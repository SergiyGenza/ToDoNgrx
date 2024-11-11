import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../../common/models/todo.model';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
    selector: 'app-todo-list-edit-ui',
    templateUrl: './todo-list-edit-ui.component.html',
    styleUrls: ['./todo-list-edit-ui.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule]
})
export class TodoListEditUiComponent implements OnInit {
  name = '';

  @Input() todo!: Todo;
  @Output() edit = new EventEmitter<string>();

  ngOnInit(): void {
    this.name = this.todo?.name
  }

  public onEdit() {
    if (this.name) {
      this.edit.emit(this.name)
    }
  }

  public onCansel() {
    this.name = this.todo.name;
    this.edit.emit(this.name);
  }

  public onPriorityAdding(event: Event) {
    event?.preventDefault();

  }
}
