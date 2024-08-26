import { Injectable, TemplateRef } from '@angular/core';
import { ActionsService } from './actions.service';
import { ModalService } from 'src/app/modules/modal/services/modal.service';
import { Items } from '../models/edit-item.model';
import { CdkDragEnd, Point } from '@angular/cdk/drag-drop';
import { TPrority } from '../models/priority.model';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class SwipeService {
  dragArea!: CdkDragEnd;
  isPriorityBarOpen: boolean = false;

  constructor(
    private actionsService: ActionsService,
    private modalService: ModalService
  ) { }

  public swipe(dragArea: CdkDragEnd, modalTemplate: TemplateRef<any>, item: Items) {
    this.dragArea = dragArea;
    const pos: Point = dragArea.source.getFreeDragPosition();

    this.setPriorityBarStatus(false);
    if (pos.x >= 20 && pos.x <= 44) {
      this.setPriorityBarStatus(true);
      console.log('priority');
      return
    } else if (pos.x >= 45) {
      this.onEdit(modalTemplate, item);
      console.log('onEdit');
    } else if (pos.x <= -20 && pos.x >= -44) {
      console.log('archive');
    } else if (pos.x <= -45) {
      console.log('onDelete');
      this.onDelete(modalTemplate, item);
    } else if (20 > pos.x || pos.x > -20) {
      console.log('none');
    }
    this.resetPosition();
  }

  public setPriorityBarStatus(value: boolean): boolean {
    this.isPriorityBarOpen = value;
    if (this.isPriorityBarOpen) {
      this.setDragAreaPos(20);
    }
    return this.isPriorityBarOpen;
  }

  public resetPosition() {
    this.dragArea.source.reset();
  }

  public changePriority(todo: Todo, priority: TPrority): void {
    this.actionsService.changeTodoPriority(todo, priority);
    this.setPriorityBarStatus(false);
    this.resetPosition();
  }

  private onEdit(modalTemplate: TemplateRef<any>, item: Items): void {
    const config = this.modalService.getModalConfig(item, 'Edit');
    if (config) {
      this.openModalAndHandleAction(modalTemplate, config, option => {
        switch (config.type) {
          case 'todoEdit':
            this.actionsService.todoEdit(option);
            break;
          case 'categoryEdit':
            this.actionsService.categoryEdit(option);
            break;
          case 'folderEdit':
            this.actionsService.folderEdit(option);
            break;
        }
      });
    }
  }

  private onDelete(modalTemplate: TemplateRef<any>, item: Items): void {
    const config = this.modalService.getModalConfig(item, 'Delete');
    if (config) {
      this.openModalAndHandleAction(modalTemplate, config, option => {
        switch (config.type) {
          case 'categoryDelete':
            option
              ? this.actionsService.deleteCategoryWithAllItems(item.category!)
              : this.actionsService.deleteCategoryAction(item.category!);
            break;
          case 'folderDelete':
            option
              ? this.actionsService.deleteFolderWithAllItems(item.folder!)
              : this.actionsService.deleteFolderAction(item.folder!);
            break;
          case 'todoDelete':
            this.actionsService.todoDelete(item.todo!);
            break;
        }
      });
    }
  }

  private openModalAndHandleAction(modalTemplate: TemplateRef<any>, config: any, action: (option: any) => void): void {
    const modalRef = this.modalService.open(modalTemplate, config);
    modalRef.subscribe(action);
  }

  private setDragAreaPos(posX: number, posY: number = 0) {
    this.dragArea.source.setFreeDragPosition({ x: posX, y: posY });
  }
}
