import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Category } from '../../models/category.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Folder } from '../../models/folder.model';
import { CreateItem } from '../../models/create-item.model';

@Component({
  selector: 'app-todo-create-form-ui',
  templateUrl: './todo-create-form-ui.component.html',
  styleUrls: ['./todo-create-form-ui.component.scss']
})
export class TodoCreateFormUiComponent {
  @Input() categoriesList!: Category[] | null;
  @Input() currentCategory!: string;
  @Output() createItem = new EventEmitter<CreateItem>();
  @ViewChild('value') value!: ElementRef;
  currentFoldersList!: Folder[];
  formType: string = 'todo';
  placeholder: string = 'add new category';
  name = '';

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    currentFolderName: new FormControl(''),
    currentCategoryName: new FormControl(''),
  })

  public onCreate(): void {
    this.createItem.emit({
      type: this.formType,
      name: this.form.controls.name.value ?? '',
      currentFolderName: this.form.controls.currentFolderName.value ?? '',
      currentCategoryName: this.form.controls.currentCategoryName.value ?? '',
    });
    this.name = '';
  }

  public onFolderPick(folderName: string): void {
    this.form.controls.currentFolderName.patchValue(folderName);
  }

  public onCategotyPick(category: Category): void {
    this.form.controls.currentCategoryName.patchValue(category.name);
    this.currentFoldersList = category.foldersList;
  }

  public clearCategoryPick(): void {
    this.form.controls.currentCategoryName.patchValue('');
  }

  public changeFormType(): string {
    this.formType = this.value.nativeElement.value;
    switch (this.value.nativeElement.value) {
      case 'folder':
        return this.placeholder = 'add new folder';
      case 'category':
        return this.placeholder = 'add new category';
      case 'todo':
        return this.placeholder = 'add new todo';
      default:
        return this.placeholder = 'add new todo';
    }
  }
}
