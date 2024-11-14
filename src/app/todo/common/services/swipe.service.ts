import { Injectable, TemplateRef } from '@angular/core';
import { Items } from '../models/edit-item.model';
import { CdkDragEnd, Point } from '@angular/cdk/drag-drop';
import { TPriority } from '../models/priority.model';
import { Todo } from '../models/todo.model';
import { BehaviorSubject } from 'rxjs';
import { SwipeComponentConfig, SWIPECOMPONENTCONFIGLIST } from '../models/swipe-items.model';
import { StoreService } from './store.service';
import { ModalService } from 'src/app/modal/services/modal.service';


@Injectable({
  providedIn: 'root'
})
export class SwipeService {
  public isPriorityBarOpen = false;
  public closeAll = new BehaviorSubject<boolean>(false);
  private dragArea!: CdkDragEnd;

  constructor(
    private storeService: StoreService,
    private modalService: ModalService
  ) { }

  // need ref

  public swipe(dragArea: CdkDragEnd, modalTemplate: TemplateRef<any>, actionItem: Items) {
    this.dragArea = dragArea;
    const action = this.getPositionAction(dragArea.source.getFreeDragPosition());
    this.closeAll.next(false);

    if (actionItem.todo) {
      this.handleTodoActions(action, modalTemplate, actionItem);
    } else if (actionItem.folder) {
      this.handleFolderActions(action, modalTemplate, actionItem);
    } else if (actionItem.category) {
      this.handleCategoryActions(action, modalTemplate, actionItem);
    }

    if (!this.isPriorityBarOpen) {
      this.resetPosition();
    }
  }

  public resetPosition() {
    if (this.dragArea) {
      console.log(this.dragArea.source.getFreeDragPosition());
      this.dragArea.source.reset();
    }
  }

  public changePriority(todo: Todo, priority: TPriority): void {
    this.storeService.changeTodoPriority(todo, priority);
    this.setPriorityBarStatus(false);
    this.resetPosition();
  }

  public setPriorityBarY(priority: TPriority): SwipeComponentConfig {
    switch (priority) {
      case ('high'):
        return SWIPECOMPONENTCONFIGLIST[0];
      case ('medium'):
        return SWIPECOMPONENTCONFIGLIST[1];
      case ('low'):
        return SWIPECOMPONENTCONFIGLIST[2];
      default:
        return SWIPECOMPONENTCONFIGLIST[3];
    }
  }

  private setPriorityBarStatus(value: boolean) {
    this.isPriorityBarOpen = value;
    // if (this.isPriorityBarOpen) {
    //   this.setDragAreaPos(20);
    // }
  }

  private onEdit(modalTemplate: TemplateRef<any>, item: Items): void {
    const config = this.modalService.getModalConfig(item, 'Edit');
    if (config) {
      this.openModalAndHandleAction(modalTemplate, config, option => {
        switch (config.type) {
          case 'todoEdit':
            this.storeService.todoEdit(option);
            break;
          case 'categoryEdit':
            this.storeService.categoryEdit(option);
            break;
          case 'folderEdit':
            this.storeService.folderEdit(option);
            break;
        }
      });
    }
  }

  private onDelete(modalTemplate: TemplateRef<any>, item: Items): void {
    const config = this.modalService.getModalConfig(item, 'Delete');
    if (config) {
      if (config.type === 'todoDelete') {
        this.storeService.todoDelete(item.todo!);
        return;
      }
      this.openModalAndHandleAction(modalTemplate, config, option => {
        switch (config.type) {
          case 'categoryDelete':
            option
              ? this.storeService.deleteCategoryWithAllItems(item.category!)
              : this.storeService.deleteCategoryAction(item.category!);
            break;
          case 'folderDelete':
            option
              ? this.storeService.deleteFolderWithAllItems(item.folder!)
              : this.storeService.deleteFolderAction(item.folder!);
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
        this.toogleFavourite(actionItem.todo!.id)
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

  private getPositionAction(pos: Point): string {
    if (pos.x >= 20 && pos.x <= 44) {
      console.log('A');
      return 'A';
    } else if (pos.x >= 55) {
      console.log('B');
      return 'B';
    } else if (pos.x <= -55) {
      console.log('C');
      return 'C';
    } else if (pos.x <= -20 && pos.x >= -44) {
      console.log('D');
      return 'D';
    }
    console.log('no action');

    return 'no action';
  }

  private toogleFavourite(id: number) {
    this.storeService.todoFavouriteStatusToggle(id);
  }
}
