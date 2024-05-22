import { Component, Input } from '@angular/core';
import { Folder } from '../../models/folder.model';
import { Store } from '@ngrx/store';
import { TodoState } from '../../store/todo/todo.reducer';
import { TodoDeleteAction, TodoEditAction, TodoToggleAction } from '../../store/todo/todo.actions';

@Component({
  selector: 'app-folder-list-item-ui',
  templateUrl: './folder-list-item-ui.component.html',
  styleUrls: ['./folder-list-item-ui.component.scss']
})
export class FolderListItemUiComponent {
  @Input() folder: Folder | undefined;

  open: boolean = true;
  constructor(
    private todoStore$: Store<TodoState>,
  ) {

  }

  public onDelete(id: number): void {
    this.todoStore$.dispatch(new TodoDeleteAction({ id }));
  }

  public onToggle(id: number): void {
    this.todoStore$.dispatch(new TodoToggleAction({ id }));
  }

  public onEdit({ id, name }: { id: number, name: string }): void {
    this.todoStore$.dispatch(new TodoEditAction({ id, name }));
  }
}
