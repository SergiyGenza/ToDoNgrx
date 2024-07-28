import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { Folder } from '../../todo/common/models/folder.model';
import { Todo } from '../../todo/common/models/todo.model';
import { EditItem } from '../../todo/common/models/create-item.model';

@Component({
  selector: 'app-modal-ui',
  templateUrl: './modal-ui.component.html',
  styleUrls: ['./modal-ui.component.scss']
})
export class ModalUiComponent {
  @Input() size? = 'md';
  @Input() title? = 'Modal title';
  @Input() type? = '';
  @Input() folder?: Folder;
  @Input() todo?: Todo;


  @Output() closeEvent = new EventEmitter();
  @Output() submitEvent = new EventEmitter();
  @Output() createCategoryEvent = new EventEmitter<string | null>();
  @Output() deleteFoldersItems = new EventEmitter<boolean>();
  @Output() editTodo = new EventEmitter<Todo>();
  @Output() editFolder = new EventEmitter<Folder>();

  constructor(private elementRef: ElementRef) { }

  close(): void {
    this.elementRef.nativeElement.remove();
    this.closeEvent.emit();
  }

  public onItemEdit(editItem: EditItem) {
    if (editItem.todo) {
      this.editTodo.emit(editItem.todo);
    } else if (editItem.folder) {
      this.editFolder.emit(editItem.folder);
    }
    this.close();
  }

  public deleteAllFoldersItems(result: boolean) {
    this.deleteFoldersItems.emit(result);
    this.close();
  }
}
