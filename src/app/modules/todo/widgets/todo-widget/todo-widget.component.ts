import { Component, OnInit, TemplateRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { TodoState } from '../../store/todo/todo.reducer';
import { TodoCreateAction, TodoDeleteAction, TodoEditAction, TodoToggleAction } from '../../store/todo/todo.actions';
import { todoListSelector } from '../../store/todo/todo.selectors';
import { Observable } from 'rxjs';
import { Todo } from '../../models/todo.model';
import { LocalstorageService } from '../../services/localstorage.service';
import { ModalService } from 'src/app/modules/modal/services/modal.service';

@Component({
  selector: 'app-todo-widget',
  templateUrl: './todo-widget.component.html',
  styleUrls: ['./todo-widget.component.scss']
})
export class TodoWidgetComponent implements OnInit {
  todoList$: Observable<Todo[]> = this.todoStore$.pipe(select(todoListSelector));

  constructor(
    private todoStore$: Store<TodoState>,
    private modalServeice: ModalService,
    localstorageService: LocalstorageService,
  ) {
    localstorageService.initTodos();
  }

  ngOnInit(): void {
    this.todoList$.subscribe((item) => console.log(item))

  }

  public onCreate(name: string) {
    this.todoStore$.dispatch(new TodoCreateAction({ name }))
  }

  public onDelete(id: number) {
    this.todoStore$.dispatch(new TodoDeleteAction({ id }))
  }

  public onToggle(id: number) {
    this.todoStore$.dispatch(new TodoToggleAction({ id }))
  }

  public onEdit({ id, name }: { id: number, name: string }) {
    this.todoStore$.dispatch(new TodoEditAction({ id, name }))
  }

  public onCategoryCreate(name: string | null) {

  }

  openModal(modalTemplate: TemplateRef<any>) {
    this.modalServeice.open(modalTemplate, { size: 'lg', title: 'title' }).subscribe((action: any) => {
      console.log('modalAction', action);
    })
  }
}
