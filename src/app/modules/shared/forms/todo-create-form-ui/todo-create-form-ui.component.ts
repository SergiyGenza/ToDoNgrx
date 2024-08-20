import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category, CategoryCreate } from '../../../todo/common/models/category.model';
import { Folder, FolderCreate } from '../../../todo/common/models/folder.model';
import { Todo, TodoCreate } from '../../../todo/common/models/todo.model';
import { EditItem } from '../../../todo/common/models/edit-item.model';
import { CategoryForm, FolderForm, TodoForm } from '../../../todo/common/models/forms.model';

@Component({
  selector: 'app-todo-create-form-ui',
  templateUrl: './todo-create-form-ui.component.html',
  styleUrls: ['./todo-create-form-ui.component.scss']
})
export class TodoCreateFormUiComponent implements OnInit {
  @Input() public categoriesList!: Category[] | null;
  @Input() public currentCategory?: Category | null;

  @Input() public modalType?: string;
  @Input() public todoForEdit?: Todo;
  @Input() public folderForEdit?: Folder;
  @Input() public categoryForEdit?: Category;

  @Output() createTotoEmitter = new EventEmitter<TodoCreate>();
  @Output() createFolderEmitter = new EventEmitter<FolderCreate>();
  @Output() createCategoryEmitter = new EventEmitter<CategoryCreate>();
  @Output() editItem = new EventEmitter<EditItem>();

  public form!: FormGroup;
  public maxHeigth!: number;
  public activeCategory: Category | null = null;
  public activeFolder!: Folder | null;
  public currentFoldersList!: Folder[];
  public formType: string = 'category';
  public placeholder: string = 'Add category';

  public todoForm = new FormGroup<TodoForm>({
    name: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    currentFolderId: new FormControl<number | null>(null),
    currentCategoryId: new FormControl<number | null>(null),
  });

  public folderForm = new FormGroup<FolderForm>({
    name: new FormControl('', { nonNullable: true, validators: Validators.required }),
    currentCategoryId: new FormControl<number | null>(null, Validators.required),
  });

  public categoryForm = new FormGroup<CategoryForm>({
    name: new FormControl('', { nonNullable: true, validators: Validators.required })
  });

  public editNameForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: Validators.required })
  })

  constructor() {
    this.form = this.categoryForm
  }

  ngOnInit(): void {
    this.isEdding();
  }

  private isEdding() {
    if (this.modalType) {
      this.formType = this.modalType;
      if (this.todoForEdit) {
        this.editNameForm.controls.name.patchValue(this.todoForEdit!.name);
      } else if (this.folderForEdit) {
        this.editNameForm.controls.name.patchValue(this.folderForEdit!.name);
      } else if (this.categoryForEdit) {
        this.editNameForm.controls.name.patchValue(this.categoryForEdit!.name);
      }
    }
  }

  public onSubmit(): void {
    if (this.todoForm.valid || this.folderForm.valid || this.categoryForm.valid || this.editNameForm.valid) {
      switch (this.formType) {
        case 'todo':
          return this.createTodo();
        case 'todoEdit':
          return this.editTodo();
        case 'folder':
          return this.createFolder();
        case 'folderEdit':
          return this.editFolder();
        case 'category':
          return this.createCategory();
        case 'categoryEdit':
          return this.editCategory();
      }
    }
  }

  public result(form: FormGroup): void {
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

  public changeFormType(): string {
    switch (this.formType) {
      case 'category':
        this.maxHeigth = 74;
        this.formType = 'folder';
        this.form = this.folderForm;

        return this.placeholder = 'Add folder';
      case 'todo':
        this.maxHeigth = 34;
        this.formType = 'category';
        this.form = this.categoryForm
        return this.placeholder = 'Add category';
      case 'folder':
        this.maxHeigth = 116;
        this.formType = 'todo';
        this.folderForm.reset();
        this.form = this.todoForm
        return this.placeholder = 'Add todo';
      default:
        return this.placeholder = 'Add todo';
    }
  }

  private createTodo() {
    this.createTotoEmitter.emit({
      name: this.form.controls['name'].value,
      currentFolderId: this.form.controls['currentFolderId'].value,
      currentCategoryId: this.form.controls['currentCategoryId'].value,
    });
  }

  private editTodo() {
    if (this.todoForEdit && this.editNameForm.valid) {
      this.editItem.emit({
        type: this.formType,
        todo: {
          ...this.todoForEdit,
          name: this.editNameForm.controls.name.value
        }
      })
    }
  }

  private createFolder() {
    this.createFolderEmitter.emit({
      name: this.form.controls['name'].value,
      currentCategoryId: this.form.controls['currentFolderId'].value,
    });
  }

  private editFolder() {
    if (this.folderForEdit && this.editNameForm.valid) {
      this.editItem.emit({
        type: this.formType,
        folder: {
          ...this.folderForEdit,
          name: this.editNameForm.controls.name.value
        }
      })
    }
  }

  private createCategory() {
    this.createCategoryEmitter.emit({
      name: this.form.controls['name'].value,
      foldersList: []
    });
  }

  private editCategory() {
    if (this.categoryForm && this.editNameForm.valid) {
      this.editItem.emit({
        type: this.formType,
        category: {
          ...this.categoryForEdit!,
          name: this.editNameForm.controls.name.value
        }
      })
    }
  }
}
