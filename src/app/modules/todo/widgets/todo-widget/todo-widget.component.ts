import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TodoState } from '../../store/todo/todo.reducer';
import { TodoCreateAction } from '../../store/todo/todo.actions';

@Component({
  selector: 'app-todo-widget',
  templateUrl: './todo-widget.component.html',
  styleUrls: ['./todo-widget.component.scss']
})
export class TodoWidgetComponent {

  constructor(private store$: Store<TodoState>) {

  }

  onCreate(name: string) {
    console.log(name);
    this.store$.dispatch(new TodoCreateAction({name}))
  }
}
