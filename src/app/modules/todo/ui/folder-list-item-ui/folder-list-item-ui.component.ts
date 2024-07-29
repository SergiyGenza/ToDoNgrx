import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Folder } from '../../common/models/folder.model';
import { Observable } from 'rxjs';
import { Todo } from '../../common/models/todo.model';

@Component({
  selector: 'app-folder-list-item-ui',
  templateUrl: './folder-list-item-ui.component.html',
  styleUrls: ['./folder-list-item-ui.component.scss']
})
export class FolderListItemUiComponent implements OnInit {
  ngOnInit(): void {
    console.log(this.folder);
  }

  @Input() todoList$: Observable<Todo[]> | undefined;
  @Input() folder!: Folder;
  @Output() deleteItem = new EventEmitter<number>();
  @Output() toggle = new EventEmitter<number>();
  @Output() edit = new EventEmitter<{ id: number, name: string }>();
  @Output() deleteFolder = new EventEmitter<{ id: number, name: string }>();

  open: boolean = true;

  public onDelete(id: number): void {
    this.deleteItem.emit(id);
  }

  public onToggle(id: number): void {
    console.log('works');
    this.toggle.emit(id);
  }

  public onEdit({ id, name }: { id: number, name: string }): void {
    this.edit.emit({ id, name });
  }

  public onFolderDelete(id: number, name: string): void {
    this.deleteFolder.emit({ id, name });
  }
}
