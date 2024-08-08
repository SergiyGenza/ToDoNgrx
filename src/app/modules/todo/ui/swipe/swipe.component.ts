import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { Todo } from '../../common/models/todo.model';
import { CdkDragEnd, Point } from '@angular/cdk/drag-drop';
import { Folder } from '../../common/models/folder.model';
import { Category } from '../../common/models/category.model';
import { ModalService } from 'src/app/modules/modal/services/modal.service';
import { ActionsService } from '../../common/services/actions.service';

@Component({
  selector: 'app-swipe',
  templateUrl: './swipe.component.html',
  styleUrls: ['./swipe.component.scss']
})
export class SwipeComponent {
  @Input() todo!: Todo;
  @Input() folder!: Folder;
  @Input() category!: Category;

  @ViewChild('modalTemplate', { static: true }) modalTemplate!: TemplateRef<any>;

  setPosition = { x: 0, y: 0 };

  constructor(
    private modalService: ModalService,
    private actionsService: ActionsService,
  ) { }

  public onEdit() {
    if (this.todo) {
      this.onTodoItemEdit(this.todo);
    } else if (this.folder) {
      this.onFolderEdit(this.folder);
    } else if (this.category) {
      this.onCategoryEdit(this.category);
    }
  }

  public onDelete() {
    if (this.todo) {
      this.onTodoDelete(this.todo);
    } else if (this.folder) {
      this.onFolderDelete(this.folder);
    } else if (this.category) {
      this.onCategoryDelete(this.category);
    }
  }

  // mb try derective
  public dragEnd($event: CdkDragEnd) {
    let pos: Point = $event.source.getFreeDragPosition();
    this.setPosition.x = pos.x;
    console.log(pos.x);
    console.log(this.setPosition.x);

    if (pos.x >= 45) {
      this.onEdit();
      console.log('onEdit');
      $event.source.reset();
      this.setPosition.x = 0;
    }
    else if (pos.x >= 20 && pos.x <= 44) {
      console.log('priority');
      $event.source.reset();
    }
    else if (pos.x <= -20 && pos.x >= -44) {
      console.log('archive');
      $event.source.reset();
    }
    else if (pos.x <= -45) {
      this.setPosition.x = 0;
      console.log('onDelete');
      this.onDelete();
      $event.source.reset();
    }
    else if (20 > pos.x || pos.x > -20) {
      console.log('none');
      this.setPosition.x = 0;
      $event.source.reset();
    }
  }

  // need create service with dispatches
  private onTodoItemEdit(todo: Todo) {
    let option = this.modalService.open(this.modalTemplate, {
      size: 'lg',
      title: 'Edit Todo',
      type: 'todoEdit',
      todo: todo
    });
    option.subscribe(option => this.actionsService.todoEdit(option))
  }

  private onFolderEdit(folder: Folder): void {
    let option = this.modalService.open(this.modalTemplate, {
      size: 'lg',
      title: 'Edit Folder',
      type: 'folderEdit',
      folder: folder
    });
    option.subscribe(option => this.actionsService.folderEdit(option));
  }

  private onCategoryEdit(category: Category): void {
    let option = this.modalService.open(this.modalTemplate, {
      size: 'lg',
      title: 'Edit Folder',
      type: 'categoryEdit',
      category: category
    });
    option.subscribe(option => this.actionsService.categoryEdit(option));
  }

  private onTodoDelete(todo: Todo): void {
    this.actionsService.todoDelete(todo);
  }

  private onFolderDelete(folder: Folder): void {
    let option = this.modalService.open(this.modalTemplate, {
      size: 'lg',
      title: 'Delete Folder',
      type: 'folderDelete'
    });
    option.subscribe(option => {
      option
        ? this.actionsService.deleteFolderWithAllItems(folder)
        : this.actionsService.deleteFolderAction(folder);
    });
  }

  private onCategoryDelete(category: Category): void {
    let option = this.modalService.open(this.modalTemplate, {
      size: 'lg',
      title: 'Delete Category',
      type: 'categoryDelete'
    });
    option.subscribe(option => {
      option
        ? this.actionsService.deleteCategoryWithAllItems(category)
        : this.actionsService.deleteCategoryAction(category);
    });
  }
}
