import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../../common/models/todo.model';

@Component({
  selector: 'app-todo-list-item-ui',
  templateUrl: './todo-list-item-ui.component.html',
  styleUrls: ['./todo-list-item-ui.component.scss']
})
export class TodoListItemUiComponent implements OnInit {
  @Input() todo: Todo | undefined;
  @Output() toggle = new EventEmitter<void>();

  listClasses!: string[]

  constructor() {
  }

  ngOnInit(): void {
    this.listClasses = [this.todo?.priority!];
  }

  public onToggle() {
    this.toggle.emit();
  }

}
