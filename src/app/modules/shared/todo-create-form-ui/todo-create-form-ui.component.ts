import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../todo/common/models/category.model';
import { CreateItem, EditItem } from '../../todo/common/models/create-item.model';
import { Folder } from '../../todo/common/models/folder.model';
import { Todo } from '../../todo/common/models/todo.model';

@Component({
  selector: 'app-todo-create-form-ui',
  templateUrl: './todo-create-form-ui.component.html',
  styleUrls: ['./todo-create-form-ui.component.scss']
})
export class TodoCreateFormUiComponent implements OnInit {
  @Input() public categoriesList!: Category[] | null;
  @Input() public currentCategory?: string;

  @Input() public modalType?: string;
  @Input() public todoForEdit?: Todo;
  @Input() public folderForEdit?: Folder;

  @Output() createItem = new EventEmitter<CreateItem>();
  @Output() editItem = new EventEmitter<EditItem>();

  public maxHeigth!: number;
  public activeCategory: Category | null = null;
  public activeFolder!: string;

  public currentFoldersList!: Folder[];
  public formType: string = 'category';
  public placeholder: string = 'Add category';
  public btnTitle: string = this.formType;

  public todoForm = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    currentFolderName: new FormControl(''),
    currentCategory: new FormControl(''),
  });

  public folderForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: Validators.required }),
    currentCategory: new FormControl('', Validators.required),
  });

  public categoryForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: Validators.required })
  });

  public editForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: Validators.required })
  })

  constructor() { }

  // best way to ref is to separate it on components

  ngOnInit(): void {
    this.setDefaultCategory();
    // need ref
    if (this.modalType) {
      this.formType = this.modalType;
      this.btnTitle = this.formType;
      if (this.todoForEdit) {
        this.editForm.controls.name.patchValue(this.todoForEdit!.name);
      } else if (this.folderForEdit) {
        this.editForm.controls.name.patchValue(this.folderForEdit!.name);
      }
    }
  }

  public isValid() {
    // need rework it
    switch (this.formType) {
      case 'category':
        return !this.categoryForm.valid;
      case 'folder':
        return !this.folderForm.valid;
      case 'todo':
        return !this.todoForm.valid;
      default:
        return !this.editForm.valid;
    }
  }

  public onSubmit(): void {
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
    }
  }

  public onCategotyPick(category: Category): void {
    this.activeCategory = category;
    this.activeFolder = '';
    if (this.formType === 'todo') {
      this.todoForm.controls.currentCategory.patchValue(category.name);
    } else if (this.formType === 'folder') {
      this.folderForm.controls.currentCategory.patchValue(category.name);
    }
    this.currentFoldersList = category.foldersList;
  }

  public onFolderPick(folderName: string): void {
    this.activeFolder = folderName;
    this.todoForm.controls.currentFolderName.patchValue(folderName);
  }

  public clearCategoryPick(): void {
    this.todoForm.controls.currentCategory.patchValue('all');
    this.activeCategory = null;
    this.activeFolder = '';
  }

  public changeFormType(): string {
    switch (this.btnTitle) {
      case 'category':
        this.btnTitle = 'folder'
        this.maxHeigth = 74;
        this.formType = this.btnTitle;
        this.folderForm.controls.name.patchValue(this.categoryForm.controls.name.value);
        this.folderForm.controls.currentCategory.patchValue(this.activeCategory?.name!);
        this.categoryForm.reset();
        return this.placeholder = 'Add folder';
      case 'todo':
        this.btnTitle = 'category'
        this.maxHeigth = 34;
        this.formType = this.btnTitle;
        this.categoryForm.controls.name.patchValue(this.todoForm.controls.name.value);
        this.todoForm.reset();
        return this.placeholder = 'Add category';
      case 'folder':
        this.btnTitle = 'todo'
        this.maxHeigth = 116;
        this.formType = this.btnTitle;
        this.todoForm.controls.name.patchValue(this.folderForm.controls.name.value);
        this.todoForm.controls.currentCategory.patchValue(this.activeCategory?.name!);
        this.folderForm.reset();
        return this.placeholder = 'Add todo';
      default:
        return this.placeholder = 'Add todo';
    }
  }

  private setDefaultCategory(): void {
    this.todoForm.controls.currentCategory.patchValue(this.currentCategory!);
    let filteredCategory = this.categoriesList?.find(category => category.name === this.currentCategory);
    if (filteredCategory) {
      this.onCategotyPick(filteredCategory);
    }
  }

  private createTodo() {
    let currentCategoryName: string = this.todoForm.controls.currentCategory.value || 'all';
    this.createItem.emit({
      type: this.formType,
      name: this.todoForm.controls.name.value!,
      currentFolderName: this.todoForm.controls.currentFolderName.value!,
      currentCategoryName: currentCategoryName!,
    });
    this.todoForm.controls.name.patchValue('');
  }

  private editTodo() {
    if (this.todoForEdit && this.editForm.valid) {
      const todo: Todo = {
        ...this.todoForEdit,
        name: this.editForm.controls.name.value
      }
      console.log('new', todo);

      this.editItem.emit({
        type: this.formType,
        todo: todo
      })
    }
  }

  private createFolder() {
    this.createItem.emit({
      type: this.formType,
      name: this.folderForm.controls.name.value!,
      currentCategoryName: this.folderForm.controls.currentCategory.value!,
      currentFolderName: '',
    });
    this.folderForm.controls.name.patchValue('');
  }

  private editFolder() {
    if (this.folderForEdit && this.editForm.valid) {
      const folder: Folder = {
        ...this.folderForEdit,
        name: this.editForm.controls.name.value
      }
      this.editItem.emit({
        type: this.formType,
        folder: folder
      })
    }
  }

  private createCategory() {
    this.createItem.emit({
      type: this.formType,
      name: this.categoryForm.controls.name.value!,
      currentCategoryName: '',
      currentFolderName: '',
    });
    this.categoryForm.controls.name.patchValue('');
  }
}
