import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalUiComponent } from './modal-ui/modal-ui.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ModalUiComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
  ]
})
export class ModalModule {}