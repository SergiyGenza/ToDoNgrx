import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { Folder } from '../../todo/common/models/folder.model';
import { Todo } from '../../todo/common/models/todo.model';
import { EditItem } from '../../todo/common/models/create-item.model';
import { Category } from '../../todo/common/models/category.model';

@Component({
  selector: 'app-modal-ui',
  templateUrl: './modal-ui.component.html',
  styleUrls: ['./modal-ui.component.scss']
})
export class ModalUiComponent {
  @Input() size? = 'md';
  @Input() title? = 'Modal title';
  @Input() type? = '';
  @Input() category?: Category;
  @Input() folder?: Folder;
  @Input() todo?: Todo;


  @Output() closeEvent = new EventEmitter();
  @Output() submitEvent = new EventEmitter();
  @Output() createCategoryEvent = new EventEmitter<string | null>();
  @Output() deleteFoldersItems = new EventEmitter<boolean>();
  @Output() deleteCategoriesItems = new EventEmitter<boolean>();
  @Output() editTodo = new EventEmitter<Todo>();
  @Output() editFolder = new EventEmitter<Folder>();
  @Output() editCategory = new EventEmitter<Category>();

  constructor(private elementRef: ElementRef) { }

  public close(): void {
    this.elementRef.nativeElement.remove();
    this.closeEvent.emit();
  }

  public onItemEdit(editItem: EditItem) {
    if (editItem.todo) {
      this.editTodo.emit(editItem.todo);
    } else if (editItem.folder) {
      this.editFolder.emit(editItem.folder);
    } else if (editItem.category) {
      this.editCategory.emit(editItem.category);
    }
    this.close();
  }

  public deleteAllFoldersItems(result: boolean) {
    this.deleteFoldersItems.emit(result);
    this.close();
  }

  public deleteAllCategoriesItems(result: boolean) {
    this.deleteFoldersItems.emit(result);
    this.close();
  }
}
