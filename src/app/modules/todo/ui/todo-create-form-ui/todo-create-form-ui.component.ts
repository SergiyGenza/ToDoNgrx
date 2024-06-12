import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from '../../models/category.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Folder } from '../../models/folder.model';
import { CreateItem } from '../../models/create-item.model';

@Component({
  selector: 'app-todo-create-form-ui',
  templateUrl: './todo-create-form-ui.component.html',
  styleUrls: ['./todo-create-form-ui.component.scss']
})
export class TodoCreateFormUiComponent implements OnInit {
  @Input() public categoriesList!: Category[] | null;
  @Input() public currentCategoryName!: string;
  @Output() createItem = new EventEmitter<CreateItem>();

  maxHeigth!: number;
  activeCategory!: Category;
  activeFolder!: string;

  public currentFoldersList!: Folder[];
  public formType: string = 'category';
  public btnTitle: string = this.formType;
  public placeholder: string = 'Add category';

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    currentFolderName: new FormControl(''),
    currentCategoryName: new FormControl(''),
  })

  constructor() { }

  ngOnInit(): void {
    this.setDefaultCategory();
  }

  public onCreate(): void {
    this.createItem.emit({
      type: this.formType,
      name: this.form.controls.name.value ?? '',
      currentFolderName: this.form.controls.currentFolderName.value ?? '',
      currentCategoryName: this.form.controls.currentCategoryName.value ?? '',
    });
    this.form.reset();
  }

  public onCategotyPick(category: Category): void {
    if (this.activeCategory != category) {
      this.form.controls.currentFolderName.patchValue('');
      this.activeFolder = '';
    }

    this.activeCategory = category;
    this.form.controls.currentCategoryName.patchValue(category.name);
    this.currentFoldersList = category.foldersList;
  }

  public onFolderPick(folderName: string): void {
    this.activeFolder = folderName;
    this.form.controls.currentFolderName.patchValue(folderName);
  }

  public clearCategoryPick(): void {
    this.form.controls.currentCategoryName.patchValue('');
  }

  public changeFormType(): string {
    switch (this.btnTitle) {
      case 'category':
        this.btnTitle = 'folder'
        this.formType = this.btnTitle;
        this.maxHeigth = 74;
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
    this.form.controls.currentCategoryName.patchValue(this.currentCategoryName);
    let filteredCategory = this.categoriesList?.find(category => category.name === this.currentCategoryName);
    // check this
    filteredCategory ? this.onCategotyPick(filteredCategory) : (() => {
      throw new Error('filteredCategory equal undefined');
    })();
  }

}
