import { Component, Input } from '@angular/core';
import { Folder } from '../../common/models/folder.model';
import { Observable } from 'rxjs';
import { Todo } from '../../common/models/todo.model';
import { SvgIconComponent } from 'angular-svg-icon';
import { TodoListUiComponent } from '../todo-list-ui/todo-list-ui.component';
import { AsyncPipe, NgClass } from '@angular/common';
import { TodoPipe } from '../../common/pipes/todo/todo.pipe';

@Component({
    selector: 'app-folder-list-item-ui',
    templateUrl: './folder-list-item-ui.component.html',
    styleUrls: ['./folder-list-item-ui.component.scss'],
    standalone: true,
  imports: [SvgIconComponent, TodoListUiComponent, AsyncPipe, TodoPipe, NgClass]
})
export class FolderListItemUiComponent {
  @Input() todoList$: Observable<Todo[]> | undefined;
  @Input() folder!: Folder;

  public showContent: boolean = true;
}
