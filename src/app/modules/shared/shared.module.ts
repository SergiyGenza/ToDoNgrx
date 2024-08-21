import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from '../todo/ui/svg-icon/svg-icon.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoCreateFormUiComponent } from './forms/todo-create-form-ui/todo-create-form-ui.component';
import { FormItemComponent } from './forms/form-item/form-item.component';
import { EditFormComponent } from './forms/edit-form/edit-form.component';



@NgModule({
  declarations: [
    TodoCreateFormUiComponent,
    SvgIconComponent,
    FormItemComponent,
    EditFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    TodoCreateFormUiComponent,
    SvgIconComponent,
    FormItemComponent,
    EditFormComponent
  ]
})
export class SharedModule { }
