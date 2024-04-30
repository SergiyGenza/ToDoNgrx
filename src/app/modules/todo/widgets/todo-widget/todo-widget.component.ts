import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { TodoState } from '../../store/todo/todo.reducer';
import { TodoCreateAction, TodoDeleteAction, TodoEditAction, TodoToggleAction } from '../../store/todo/todo.actions';
import { todoListSelector } from '../../store/todo/todo.selectors';
import { Observable } from 'rxjs';
import { Todo } from '../../models/todo.model';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-todo-widget',
  templateUrl: './todo-widget.component.html',
  styleUrls: ['./todo-widget.component.scss']
})
export class TodoWidgetComponent {
  todoList$: Observable<Todo[]> = this.store$.pipe(select(todoListSelector));

  constructor(
    private store$: Store<TodoState>,
    localstorageService: LocalstorageService,
  ) {
    localstorageService.init();
  }

  public onCreate(name: string) {
    this.store$.dispatch(new TodoCreateAction({ name }))
  }

  public onDelete(id: number) {
    this.store$.dispatch(new TodoDeleteAction({ id }))
  }

  public onToggle(id: number) {
    this.store$.dispatch(new TodoToggleAction({ id }))
  }

  public onEdit({ id, name }: { id: number, name: string }) {
    this.store$.dispatch(new TodoEditAction({ id, name }))
  }
}
