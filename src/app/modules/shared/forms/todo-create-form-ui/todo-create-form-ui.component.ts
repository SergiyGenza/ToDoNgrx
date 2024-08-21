import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category, CategoryCreate } from '../../../todo/common/models/category.model';
import { FolderCreate } from '../../../todo/common/models/folder.model';
import { TodoCreate } from '../../../todo/common/models/todo.model';
import { CategoryForm, FolderForm, TodoForm } from '../../../todo/common/models/forms.model';

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
  selector: 'app-todo-create-form-ui',
  templateUrl: './todo-create-form-ui.component.html',
  styleUrls: ['./todo-create-form-ui.component.scss']
})
export class TodoCreateFormUiComponent {
  @Input() public categoriesList!: Category[] | null;
  @Input() public currentCategory?: Category | null;

  @Output() createTotoEmitter = new EventEmitter<TodoCreate>();
  @Output() createFolderEmitter = new EventEmitter<FolderCreate>();
  @Output() createCategoryEmitter = new EventEmitter<CategoryCreate>();

  public form!: FormGroup;
  public maxHeigth!: number;
  public formType: string = 'category';
  public placeholder: string = 'Add category';

  constructor() {
    this.form = categoryForm
  }

  public onSubmit(form: FormGroup): void {
    switch (this.formType) {
      case 'todo':
        return this.createTotoEmitter.emit({
          name: form.controls['name'].value,
          currentFolderId: form.controls['currentFolderId'].value,
          currentCategoryId: form.controls['currentCategoryId'].value,
        });
      case 'folder':
        return this.createFolderEmitter.emit({
          name: form.controls['name'].value,
          currentCategoryId: form.controls['currentFolderId'].value,
        });
      case 'category':
        return this.createCategoryEmitter.emit({
          name: form.controls['name'].value,
          foldersList: []
        });
    }
  }

  public onFormTypeChange(): string {
    switch (this.formType) {
      case 'category':
        this.maxHeigth = 74;
        this.formType = 'folder';
        this.form = folderForm;
        return this.placeholder = 'Add folder';
      case 'todo':
        this.maxHeigth = 34;
        this.formType = 'category';
        this.form = categoryForm
        return this.placeholder = 'Add category';
      case 'folder':
        this.maxHeigth = 116;
        this.formType = 'todo';
        this.form = todoForm
        return this.placeholder = 'Add todo';
      default:
        return this.placeholder = 'Add todo';
    }
  }
}

