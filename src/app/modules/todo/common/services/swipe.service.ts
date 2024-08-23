import { Injectable, TemplateRef } from '@angular/core';
import { ActionsService } from './actions.service';
import { ModalService } from 'src/app/modules/modal/services/modal.service';
import { Items } from '../models/edit-item.model';

@Injectable({
  providedIn: 'root'
})
export class SwipeService {
  constructor(
    private actionsService: ActionsService,
    private modalService: ModalService
  ) { }

  public swipe(pos: number, modalTemplate: TemplateRef<any>, item: Items) {
    if (pos >= 45) {
      this.onEdit(modalTemplate, item);
      console.log('onEdit');
    } else if (pos >= 20) {
      console.log('priority');
    } else if (pos >= -44) {
      console.log('archive');
    } else if (pos <= -45) {
      console.log('onDelete');
      this.onDelete(modalTemplate, item);
    } else {
      console.log('none');
    }
  }

  private onEdit(modalTemplate: TemplateRef<any>, item: Items) {
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

  private onDelete(modalTemplate: TemplateRef<any>, item: Items) {
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

  private openModalAndHandleAction(modalTemplate: TemplateRef<any>, config: any, action: (option: any) => void) {
    const modalRef = this.modalService.open(modalTemplate, config);
    modalRef.subscribe(action);
  }

}
