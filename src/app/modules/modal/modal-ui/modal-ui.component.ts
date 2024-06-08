import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal-ui',
  templateUrl: './modal-ui.component.html',
  styleUrls: ['./modal-ui.component.scss']
})
export class ModalUiComponent {
  @Input() size? = 'md';
  @Input() title? = 'Modal title';
  @Input() type? = '';

  form = new FormGroup({
    categoryName: new FormControl(''),
  })

  @Output() closeEvent = new EventEmitter();
  @Output() submitEvent = new EventEmitter();
  @Output() createCategoryEvent = new EventEmitter<string | null>();
  @Output() deleteFoldersItems = new EventEmitter<boolean>();

  constructor(private elementRef: ElementRef) { }

  close(): void {
    this.elementRef.nativeElement.remove();
    this.closeEvent.emit();
  }

  submit(): void {
    switch (this.type) {
      case 'form': {
        console.log(this.form.controls.categoryName.value);
        this.elementRef.nativeElement.remove();
        this.createCategoryEvent.emit(this.form.controls.categoryName.value)
        this.form.controls.categoryName.patchValue('');
        break;
      }
      case '': {
        this.elementRef.nativeElement.remove();
        this.submitEvent.emit();
        break;
      }
    }
  }

  public deleteAllFoldersItems(result: boolean) {
    this.deleteFoldersItems.emit(result);
    this.close();
  }
}
