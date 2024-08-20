import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from '../todo/ui/svg-icon/svg-icon.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoCreateFormUiComponent } from './forms/todo-create-form-ui/todo-create-form-ui.component';
import { FormItemComponent } from './forms/form-item/form-item.component';



@NgModule({
  declarations: [
    TodoCreateFormUiComponent,
    SvgIconComponent,
    FormItemComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    TodoCreateFormUiComponent,
    SvgIconComponent,
    FormItemComponent
  ]
})
export class SharedModule { }
