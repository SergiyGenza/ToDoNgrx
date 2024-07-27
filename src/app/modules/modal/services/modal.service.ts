import { ComponentFactoryResolver, Inject, Injectable, Injector, TemplateRef } from '@angular/core';
import { ModalUiComponent } from '../modal-ui/modal-ui.component';
import { DOCUMENT } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { Folder } from '../../todo/common/models/folder.model';
import { Todo } from '../../todo/common/models/todo.model';

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

  open(content: TemplateRef<any>, options?: { size?: string, title?: string, type?: string, folder?: Folder, todo?: Todo }): Observable<any> {
    const modalComponentFactory = this.resolver.resolveComponentFactory(ModalUiComponent);
    const contentViewRef = content.createEmbeddedView(null);
    const modalComponent = modalComponentFactory.create(this.injector, [contentViewRef.rootNodes,]);

    modalComponent.instance.size = options?.size;
    modalComponent.instance.title = options?.title;
    modalComponent.instance.type = options?.type;
    modalComponent.instance.folder = options?.folder;
    modalComponent.instance.todo = options?.todo;
    
    modalComponent.instance.closeEvent.subscribe(() => this.closeModal());
    modalComponent.instance.submitEvent.subscribe(() => this.submitModal());
    modalComponent.instance.createCategoryEvent.subscribe((item) => this.submitForm(item));
    modalComponent.instance.deleteFoldersItems.subscribe((item) => this.onFolderDelete(item));
    modalComponent.instance.editTodo.subscribe((item) => this.editTodo(item));

    modalComponent.hostView.detectChanges()
    this.document.body.appendChild(modalComponent.location.nativeElement);
    this.modalNotifired = new Subject();

    return this.modalNotifired.asObservable();
  }

  closeModal() {
    this.modalNotifired?.complete();
  }

  editTodo(todo: any) {
    this.modalNotifired?.next(todo);
    this.closeModal();
  }

  submitModal() {
    this.modalNotifired?.next('confirm');
    this.closeModal();
  }

  submitForm(item: any) {
    this.modalNotifired?.next(item)
  }

  onFolderDelete(item: any) {
    this.modalNotifired?.next(item);
    this.closeModal();
  }

}
