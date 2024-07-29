import { Component, Input } from '@angular/core';
import { Folder } from '../../common/models/folder.model';
import { Observable } from 'rxjs';
import { Todo } from '../../common/models/todo.model';

@Component({
  selector: 'app-folder-list-item-ui',
  templateUrl: './folder-list-item-ui.component.html',
  styleUrls: ['./folder-list-item-ui.component.scss']
})
export class FolderListItemUiComponent {
  @Input() todoList$: Observable<Todo[]> | undefined;
  @Input() folder!: Folder;

  isOpen: boolean = true;
}
