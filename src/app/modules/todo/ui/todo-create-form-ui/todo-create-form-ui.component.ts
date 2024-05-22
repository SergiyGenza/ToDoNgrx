import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-todo-create-form-ui',
  templateUrl: './todo-create-form-ui.component.html',
  styleUrls: ['./todo-create-form-ui.component.scss']
})
export class TodoCreateFormUiComponent {
  @Input() placeholder!: string;
  @Output() create = new EventEmitter<string>();
  name = '';

  public onCreate() {
    this.create.emit(this.name);
    this.name = '';
  }
}
