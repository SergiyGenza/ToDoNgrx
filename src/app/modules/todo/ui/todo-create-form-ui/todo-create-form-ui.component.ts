import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../common/models/category.model';
import { Folder } from '../../common/models/folder.model';
import { CreateItem } from '../../common/models/create-item.model';

@Component({
  selector: 'app-todo-create-form-ui',
  templateUrl: './todo-create-form-ui.component.html',
  styleUrls: ['./todo-create-form-ui.component.scss']
})
export class TodoCreateFormUiComponent implements OnInit {
  @Input() public categoriesList!: Category[] | null;
  @Input() public currentCategory?: string;
  @Output() createItem = new EventEmitter<CreateItem>();

  public maxHeigth!: number;
  public activeCategory: Category | null = null;
  public activeFolder!: string;
  public activeNoneCat: boolean = true;
  public activeNoneFolder: boolean = true;

  public currentFoldersList!: Folder[];
  public formType: string = 'category';
  public placeholder: string = 'Add category';
  public btnTitle: string = this.formType;

  public todoForm = new FormGroup({
    name: new FormControl('', Validators.required),
    currentFolderName: new FormControl('',),
    currentCategory: new FormControl(''),
  })

  constructor() { }

  ngOnInit(): void {
    this.setDefaultCategory();
  }

  public onCreate(): void {
    // onkeyEnter checkong form.valid
    if (!this.todoForm.valid) {
      throw Error('form invalid');
    }
    switch (this.formType) {
      case 'todo':
        return this.createTodo();
      case 'folder':
        return this.createFolder();
      case 'category':
        return this.createCategory();
    }
  }

  private createTodo() {
    let currentCategoryName: string | null;
    currentCategoryName =
      this.todoForm.controls.currentCategory.value === ''
        ? 'all'
        : this.todoForm.controls.currentCategory.value;
    this.createItem.emit({
      type: this.formType,
      name: this.todoForm.controls.name.value!,
      currentFolderName: this.todoForm.controls.currentFolderName.value!,
      currentCategoryName: currentCategoryName!,
    });
    this.todoForm.controls.name.patchValue('');
  }

  private createFolder() {
    if (this.formType === 'folder' && (this.todoForm.controls.currentCategory.value === '' || this.todoForm.controls.currentCategory.value === 'all')) {
      throw new Error('Pick category for folder');
    }
    this.createItem.emit({
      type: this.formType,
      name: this.todoForm.controls.name.value!,
      currentFolderName: '',
      currentCategoryName: this.todoForm.controls.currentCategory.value!,
    });
    this.todoForm.controls.name.patchValue('');
  }

  private createCategory() {
    this.createItem.emit({
      type: this.formType,
      name: this.todoForm.controls.name.value!,
      currentFolderName: '',
      currentCategoryName: '',
    });
    this.todoForm.controls.name.patchValue('');
  }

  public onCategotyPick(category: Category): void {
    if (this.activeCategory != category) {
      this.todoForm.controls.currentFolderName.patchValue('');
      this.activeFolder = '';
    }
    this.activeCategory = category;
    this.todoForm.controls.currentCategory.patchValue(category.name);
    this.currentFoldersList = category.foldersList;
    this.activeNoneCat = false;
    this.activeNoneCat = false;
  }

  public onFolderPick(folderName: string): void {
    this.activeFolder = folderName;
    this.todoForm.controls.currentFolderName.patchValue(folderName);
    folderName === ''
      ? this.activeNoneFolder = true
      : this.activeNoneFolder = false;
  }

  public clearCategoryPick(): void {
    this.todoForm.controls.currentCategory.patchValue('');
    this.todoForm.controls.currentFolderName.patchValue('');
    this.activeCategory = null;
    this.activeNoneCat = true;
    this.activeNoneFolder = true;
    this.activeFolder = '';
  }

  public changeFormType(): string {
    switch (this.btnTitle) {
      case 'category':
        this.btnTitle = 'folder'
        this.formType = this.btnTitle;
        this.maxHeigth = 74;
        this.clearCategoryPick();
        return this.placeholder = 'Add folder';
      case 'todo':
        this.btnTitle = 'category'
        this.formType = this.btnTitle;
        this.maxHeigth = 34;
        return this.placeholder = 'Add category';
      case 'folder':
        this.btnTitle = 'todo'
        this.formType = this.btnTitle;
        this.maxHeigth = 116;
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

}
