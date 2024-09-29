import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category, CategoryCreate } from '../../common/models/category.model';
import { FolderCreate } from '../../common/models/folder.model';
import { TodoCreate } from '../../common/models/todo.model';
import { CategoryForm, FolderForm, TodoForm } from '../../common/models/forms.model';

const todoForm = new FormGroup<TodoForm>({
  name: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
  currentFolderId: new FormControl<number | null>(null),
  currentCategoryId: new FormControl<number | null>(null),
});

const folderForm = new FormGroup<FolderForm>({
  name: new FormControl('', { nonNullable: true, validators: Validators.required }),
  currentCategoryId: new FormControl<number | null>(null, Validators.required),
});

const categoryForm = new FormGroup<CategoryForm>({
  name: new FormControl('', { nonNullable: true, validators: Validators.required })
});

@Component({
  selector: 'app-create-items',
  templateUrl: './create-items.component.html',
  styleUrls: ['./create-items.component.scss']
})
export class CreateItemsComponent {
  @Input() 
  public categoriesList: Category[] | null | undefined;
  @Input() 
  public currentCategory?: Category | null;

  @Output() 
  createTotoEmitter = new EventEmitter<TodoCreate>();
  @Output() 
  createFolderEmitter = new EventEmitter<FolderCreate>();
  @Output() 
  createCategoryEmitter = new EventEmitter<CategoryCreate>();

  public form: FormGroup = categoryForm;
  public maxHeigth: number = 74;
  public formType: string = 'category';
  public placeholder: string = 'Add category';

  public onSubmit(form: FormGroup): void {
    const { name, currentFolderId, currentCategoryId } = form.controls;

    switch (this.formType) {
      case 'todo':
        this.createTotoEmitter.emit({
          name: name.value,
          currentFolderId: currentFolderId.value,
          currentCategoryId: currentCategoryId.value,
        });
        break;
      case 'folder':
        this.createFolderEmitter.emit({
          name: name.value,
          currentCategoryId: currentCategoryId.value,
        });
        break;
      case 'category':
        this.createCategoryEmitter.emit({
          name: name.value,
          foldersList: [],
        });
        break;
    }
  }

  public onFormTypeChange(): void {
    switch (this.formType) {
      case 'category':
        this.updateForm('folder', folderForm, 'Add folder', 74);
        break;
      case 'todo':
        this.updateForm('category', categoryForm, 'Add category', 34);
        break;
      case 'folder':
      default:
        this.updateForm('todo', todoForm, 'Add todo', 116);
        break;
    }
  }

  private updateForm(formType: string, form: FormGroup, placeholder: string, maxHeight: number): void {
    this.formType = formType;
    this.form = form;
    this.placeholder = placeholder;
    this.maxHeigth = maxHeight;
  }

}

