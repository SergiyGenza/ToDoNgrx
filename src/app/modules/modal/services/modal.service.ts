import { ComponentFactoryResolver, Inject, Injectable, Injector, TemplateRef } from '@angular/core';
import { ModalUiComponent } from '../modal-ui/modal-ui.component';
import { DOCUMENT } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { Folder } from '../../todo/common/models/folder.model';
import { Todo } from '../../todo/common/models/todo.model';
import { Category } from '../../todo/common/models/category.model';
import { Items } from '../../todo/common/models/edit-item.model';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalNotifired?: Subject<any>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    @Inject(DOCUMENT) private document: Document,
  ) { }

  public open(content: TemplateRef<any>, options?: { size?: string, title?: string, type?: string, folder?: Folder, todo?: Todo, category?: Category }): Observable<any> {
    const modalComponentFactory = this.resolver.resolveComponentFactory(ModalUiComponent);
    const contentViewRef = content.createEmbeddedView(null);
    const modalComponent = modalComponentFactory.create(this.injector, [contentViewRef.rootNodes,]);

    modalComponent.instance.size = options?.size;
    modalComponent.instance.title = options?.title;
    modalComponent.instance.type = options?.type;
    modalComponent.instance.category = options?.category;
    modalComponent.instance.folder = options?.folder;
    modalComponent.instance.todo = options?.todo;

    modalComponent.instance.closeEvent.subscribe(() => this.closeModal());
    modalComponent.instance.submitEvent.subscribe(() => this.submitModal());
    modalComponent.instance.createCategoryEvent.subscribe((item) => this.submitForm(item));
    modalComponent.instance.deleteFoldersItems.subscribe((item) => this.onFolderDelete(item));
    modalComponent.instance.deleteCategoriesItems.subscribe((item) => this.onCategoryDelete(item));
    modalComponent.instance.editTodo.subscribe((item) => this.editTodo(item));
    modalComponent.instance.editFolder.subscribe((item) => this.editFolder(item));
    modalComponent.instance.editCategory.subscribe((item) => this.editCategory(item));

    modalComponent.hostView.detectChanges()
    this.document.body.appendChild(modalComponent.location.nativeElement);
    this.modalNotifired = new Subject();

    return this.modalNotifired.asObservable();
  }

  public getModalConfig(item: Items, action: 'Edit' | 'Delete') {
    if (item.todo) {
      return {
        size: 'lg',
        title: `${action} Todo`,
        type: `todo${action}` as const,
        todo: item.todo
      };
    } else if (item.category) {
      return {
        size: 'lg',
        title: `${action} Category`,
        type: `category${action}` as const,
        category: item.category
      };
    } else if (item.folder) {
      return {
        size: 'lg',
        title: `${action} Folder`,
        type: `folder${action}` as const,
        folder: item.folder
      };
    }
    return null;
  }

  private closeModal() {
    this.modalNotifired?.complete();
  }

  private editTodo(todo: any) {
    this.modalNotifired?.next(todo);
    this.closeModal();
  }

  private editFolder(folder: any) {
    this.modalNotifired?.next(folder);
    this.closeModal();
  }

  private editCategory(category: any) {
    this.modalNotifired?.next(category);
    this.closeModal();
  }

  private submitModal() {
    this.modalNotifired?.next('confirm');
    this.closeModal();
  }

  private submitForm(item: any) {
    this.modalNotifired?.next(item)
  }

  private onFolderDelete(item: any) {
    this.modalNotifired?.next(item);
    this.closeModal();
  }

  private onCategoryDelete(item: any) {
    this.modalNotifired?.next(item);
    this.closeModal();
  }



}
