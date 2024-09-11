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

  public swipe(dragArea: CdkDragEnd, modalTemplate: TemplateRef<any>, actionItem: Items) {
    this.dragArea = dragArea;
    const action = this.getPositionAction(dragArea.source.getFreeDragPosition());
    
    if (actionItem.todo) {
      this.handleTodoActions(action, modalTemplate, actionItem);
    } else if (actionItem.folder) {
      this.handleFolderActions(action, modalTemplate, actionItem);
    } else if (actionItem.category) {
      this.handleCategoryActions(action, modalTemplate, actionItem);
    }

    this.resetPosition();
  }

  private handleTodoActions(action: string, modalTemplate: TemplateRef<any>, actionItem: Items) {
    switch (action) {
      case 'A':
        this.setPriorityBarStatus(true);
        break;
      case 'B':
        this.onEdit(modalTemplate, actionItem);
        break;
      case 'C':
        this.onDelete(modalTemplate, actionItem);
        break;
      case 'D':
        console.log('favourite');
        break;
      default:
        break;
    }
  }

  private handleFolderActions(action: string, modalTemplate: TemplateRef<any>, actionItem: Items) {
    switch (action) {
      case 'A':
        this.onEdit(modalTemplate, actionItem);
        break;
      case 'C':
        this.onDelete(modalTemplate, actionItem);
        break;
      case 'D':
        console.log('favourite');
        break;
      default:
        break;
    }
  }

  private handleCategoryActions(action: string, modalTemplate: TemplateRef<any>, actionItem: Items) {
    switch (action) {
      case 'A':
        this.onEdit(modalTemplate, actionItem);
        break;
      case 'C':
        this.onDelete(modalTemplate, actionItem);
        break;
      default:
        break;
    }
  }

  getPositionAction(pos: Point): string {
    if (pos.x >= 20 && pos.x <= 44) {
      console.log('A');
      return 'A';
    } else if (pos.x >= 45) {
      console.log('B');
      return 'B';
    } else if (pos.x <= -45) {
      console.log('C');
      return 'C';
    } else if (pos.x <= -20 && pos.x >= -44) {
      console.log('D');
      return 'D';
    }
    console.log('');

    return '';
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
      if (config.type === 'todoDelete') {
        this.actionsService.todoDelete(item.todo!);
        return;
      }
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
