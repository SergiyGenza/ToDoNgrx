import { ComponentFactoryResolver, Inject, Injectable, Injector, TemplateRef } from '@angular/core';
import { ModalUiComponent } from '../modal-ui/modal-ui.component';
import { DOCUMENT } from '@angular/common';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalNotifired?: Subject<string>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    @Inject(DOCUMENT) private document: Document,
  ) { }

  open(content: TemplateRef<any>, options?: { size?: string, title?: string }): Observable<string> {
    const modalComponentFactory = this.resolver.resolveComponentFactory(ModalUiComponent);
    const contentViewRef = content.createEmbeddedView(null);
    const modalComponent = modalComponentFactory.create(this.injector, [contentViewRef.rootNodes,]);


    modalComponent.instance.size = options?.size;
    modalComponent.instance.title = options?.title;
    modalComponent.instance.closeEvent.subscribe(() => this.closeModal())
    modalComponent.instance.submitEvent.subscribe(() => this.submitModal())

    modalComponent.hostView.detectChanges()
    this.document.body.appendChild(modalComponent.location.nativeElement);
    this.modalNotifired = new Subject();
    return this.modalNotifired.asObservable();
  }

  closeModal() {
    this.modalNotifired?.complete();
  }

  submitModal() {
    this.modalNotifired?.next('confirm');
    this.closeModal();
  }

}
