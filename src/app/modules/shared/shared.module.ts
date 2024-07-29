import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoCreateFormUiComponent } from './todo-create-form-ui/todo-create-form-ui.component';
import { SvgIconComponent } from '../todo/ui/svg-icon/svg-icon.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TodoCreateFormUiComponent,
    SvgIconComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    TodoCreateFormUiComponent,
    SvgIconComponent

  ]
})
export class SharedModule { }
