import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormItemComponent } from './forms/form-item/form-item.component';
import { EditFormComponent } from './forms/edit-form/edit-form.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';



@NgModule({
  declarations: [
    FormItemComponent,
    EditFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularSvgIconModule.forRoot()
  ],
  exports: [
    FormItemComponent,
    EditFormComponent
  ]
})
export class SharedModule { }
