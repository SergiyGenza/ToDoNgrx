import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { TodoState } from '../../store/todo/todo.reducer';
import { TodoCreateAction, TodoDeleteAction, TodoToggleAction } from '../../store/todo/todo.actions';
import { todoListSelector } from '../../store/todo/todo.selectors';
import { Observable } from 'rxjs';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-widget',
  templateUrl: './todo-widget.component.html',
  styleUrls: ['./todo-widget.component.scss']
})
export class TodoWidgetComponent {
  todoList$: Observable<Todo[]> = this.store$.pipe(select(todoListSelector))

  constructor(private store$: Store<TodoState>) {

  }

  onCreate(name: string) {
    console.log(name);
    this.store$.dispatch(new TodoCreateAction({ name }))
  }

  onDelete(id: number) {
    this.store$.dispatch(new TodoDeleteAction({ id }))
  }

  onToggle(id: number) {
    this.store$.dispatch(new TodoToggleAction({ id }))
  }
}
