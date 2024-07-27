import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

  form = new FormGroup({
    categoryName: new FormControl(''),
  })

  @Output() closeEvent = new EventEmitter();
  @Output() submitEvent = new EventEmitter();
  @Output() createCategoryEvent = new EventEmitter<string | null>();
  @Output() deleteFoldersItems = new EventEmitter<boolean>();
  @Output() editFolder = new EventEmitter<Folder>();
  @Output() editTodo = new EventEmitter<Todo>();

  constructor(private elementRef: ElementRef) { }

  close(): void {
    this.elementRef.nativeElement.remove();
    this.closeEvent.emit();
  }

  public onItemEdit(editItem: EditItem) {
    this.editTodo.emit(editItem.item);
    this.close();
  }

  public deleteAllFoldersItems(result: boolean) {
    this.deleteFoldersItems.emit(result);
    this.close();
  }
}
