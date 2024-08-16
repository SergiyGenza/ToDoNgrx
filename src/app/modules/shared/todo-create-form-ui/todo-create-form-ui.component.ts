import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category, CategoryCreate } from '../../todo/common/models/category.model';
// import { CreateItem, EditItem } from '../../todo/common/models/create-item.model';
import { Folder, FolderCreate } from '../../todo/common/models/folder.model';
import { Todo, TodoCreate } from '../../todo/common/models/todo.model';

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

  // @Output() createItem = new EventEmitter<CreateItem>();
  @Output() createTotoEmitter = new EventEmitter<TodoCreate>();
  // @Output() editItem = new EventEmitter<EditItem>();

  @Output() createFolderEmitter = new EventEmitter<FolderCreate>();

  @Output() createCategoryEmitter = new EventEmitter<CategoryCreate>();

  public maxHeigth!: number;
  public activeCategory: Category | null = null;

  // need check this var
  public activeFolder!: Folder | null;
  // need check this var

  public currentFoldersList!: Folder[];
  public formType: string = 'category';
  public placeholder: string = 'Add category';
  public btnTitle: string = this.formType;

  public todoForm = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    currentFolderId: new FormControl<number | null>(null),
    currentCategoryId: new FormControl<number | null>(null),
  });

  public folderForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: Validators.required }),
    currentCategoryId: new FormControl<number | null>(null, Validators.required),
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
      } else if (this.categoryForEdit) {
        this.editForm.controls.name.patchValue(this.categoryForEdit!.name);
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
    if (this.todoForm.valid || this.folderForm.valid || this.categoryForm.valid || this.editForm.valid) {
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

  public onCategotyPick(category: Category): void {
    this.activeCategory = category;
    this.activeFolder = null;
    if (this.formType === 'todo') {
      this.todoForm.controls.currentCategoryId.patchValue(category.id);
    } else if (this.formType === 'folder') {
      this.folderForm.controls.currentCategoryId.patchValue(category.id);
    }
    this.currentFoldersList = category.foldersList;
  }

  public onFolderPick(folder: Folder | null): void {
    if (folder) {
      console.log(this.activeFolder);
      console.log(folder);
      
      this.activeFolder = folder;
      this.todoForm.controls.currentFolderId.patchValue(folder.id);
    } else {
      this.activeFolder = null;
    }
    console.log(this.activeFolder);
    
  }

  public clearCategoryPick(): void {
    this.todoForm.controls.currentCategoryId.patchValue(null);
    this.activeCategory = null;
    this.activeFolder!.name = '';
  }

  public isFolderActive(folder: Folder): boolean {
    if (this.activeFolder) {
      return this.activeFolder!.id === folder.id
    }
    return false;
  }

  public changeFormType(): string {
    switch (this.btnTitle) {
      case 'category':
        this.btnTitle = 'folder'
        this.maxHeigth = 74;
        this.formType = this.btnTitle;
        this.folderForm.controls.name.patchValue(this.categoryForm.controls.name.value);
        this.folderForm.controls.currentCategoryId.patchValue(this.activeCategory?.id!);
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
        this.todoForm.controls.currentCategoryId.patchValue(this.activeCategory?.id!);
        this.folderForm.reset();
        return this.placeholder = 'Add todo';
      default:
        return this.placeholder = 'Add todo';
    }
  }

  private setDefaultCategory(): void {
    this.todoForm.controls.currentCategoryId.patchValue(this.currentCategory!.id);
    let filteredCategory = this.categoriesList?.find(category => category.name === this.currentCategory!.name);
    console.log(filteredCategory);

    if (filteredCategory) {
      console.log(filteredCategory);
      this.onCategotyPick(filteredCategory);
    }
  }

  private createTodo() {
    this.createTotoEmitter.emit({
      name: this.todoForm.controls.name.value!,
      currentFolderId: this.activeFolder ? this.activeFolder.id : null,
      currentCategoryId: this.currentCategory ? this.currentCategory.id : null,
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

      // this.editItem.emit({
      //   type: this.formType,
      //   todo: todo
      // })
    }
  }

  private createFolder() {
    this.createFolderEmitter.emit({
      name: this.folderForm.controls.name.value!,
      currentCategoryId: this.folderForm.controls.currentCategoryId.value!,
    });
    this.folderForm.controls.name.patchValue('');
  }

  private editFolder() {
    if (this.folderForEdit && this.editForm.valid) {
      const folder: Folder = {
        ...this.folderForEdit,
        name: this.editForm.controls.name.value
      }
      // this.editItem.emit({
      //   type: this.formType,
      //   folder: folder
      // })
    }
  }

  private createCategory() {
    this.createCategoryEmitter.emit({
      name: this.categoryForm.controls.name.value!,
      foldersList: []
    });
    this.categoryForm.controls.name.patchValue('');
  }

  private editCategory() {
    if (this.categoryForm && this.editForm.valid) {
      const category: Category = {
        ...this.categoryForEdit!,
        name: this.editForm.controls.name.value
      }
      // this.editItem.emit({
      //   type: this.formType,
      //   category: category
      // })
    }
  }
}
