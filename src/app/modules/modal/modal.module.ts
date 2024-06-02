import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalUiComponent } from './modal-ui/modal-ui.component';

@NgModule({
  declarations: [
    ModalUiComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
  ]
})
export class ModalModule {}