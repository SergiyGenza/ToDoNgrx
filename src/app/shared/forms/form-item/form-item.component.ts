import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgTemplateOutlet, NgClass } from '@angular/common';
import { SvgIconComponent } from 'angular-svg-icon';
import { Category, CategoryCreate } from 'src/app/todo/common/models/category.model';
import { FolderCreate, Folder } from 'src/app/todo/common/models/folder.model';
import { TodoForm, FolderForm, CategoryForm } from 'src/app/todo/common/models/forms.model';
import { TodoCreate } from 'src/app/todo/common/models/todo.model';

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

// const config: formConfig[] = [
//   {},
//   {},
//   {}
// ]

@Component({
  selector: 'app-form-item',
  templateUrl: './form-item.component.html',
  styleUrl: './form-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, NgTemplateOutlet, SvgIconComponent, NgClass]
})
export class FormItemComponent implements OnChanges, OnInit {
  @Input()
  public categoriesList: Category[] | null | undefined;
  @Input()
  public currentCategory?: Category | null;

  @Output()
  createTodoEmitter = new EventEmitter<TodoCreate>();
  @Output()
  createFolderEmitter = new EventEmitter<FolderCreate>();
  @Output()
  createCategoryEmitter = new EventEmitter<CategoryCreate>();

  // config
  public formType: string = 'category';
  public form: FormGroup = categoryForm;
  public placeholder: string = 'Add category';
  public maxHeigth: number = 34;

  public activeCategory?: Category | null = null;
  public activeFolder: Folder | null = null;
  public currentFoldersList: Folder[] | null = null

  constructor() { }

  ngOnInit(): void {
    this.activeCategory = this.currentCategory;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentCategory']) {
      this.activeCategory = this.currentCategory;
      this.currentFoldersList = this.activeCategory?.foldersList ?? null;
      this.setDefaultDataControls();
    }
  }

  // mb try observable to detect changes;
  public onSubmit() {
    if (this.form.valid) {
      const { name, currentFolderId, currentCategoryId } = this.form.controls;
      switch (this.formType) {
        case 'todo':
          this.createTodoEmitter.emit({
            name: name.value,
            currentFolderId: currentFolderId.value,
            currentCategoryId: currentCategoryId.value,
            priority: "none",
            favourite: false,
            date: new Date()
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
      this.form.reset();
      this.clearValues();
    }
  }

  public onCategotyPick(category: Category): void {
    this.patchControlValue('currentCategoryId', category.id);
    this.activeCategory = category;
    this.activeFolder = null;
    this.currentFoldersList = category.foldersList;
  }

  public clearCategoryPick(): void {
    this.patchControlValue('currentCategoryId', null);
    this.clearValues();
  }

  public onFolderPick(folder: Folder | null): void {
    this.patchControlValue('currentFolderId', folder?.id ?? null);
    this.activeFolder = folder;
  }

  public isFolderActive(folder: Folder): boolean {
    return this.activeFolder?.id === folder.id || false;
  }

  public onFormTypeChange(): void {
    switch (this.formType) {
      case 'category':
        this.changeForm('folder', folderForm, 'Add folder', 74);
        break;
      case 'todo':
        this.changeForm('category', categoryForm, 'Add category', 34);
        break;
      case 'folder':
      default:
        this.changeForm('todo', todoForm, 'Add todo', 116);
        break;
    }
  }

  private changeForm(formType: string, form: FormGroup, placeholder: string, maxHeight: number): void {
    this.formType = formType;
    this.placeholder = placeholder;
    this.maxHeigth = maxHeight;

    let name = this.form.controls['name'].value;
    this.form = form;
    this.patchControlValue('name', name);
  }

  private setDefaultDataControls(): void {
    this.patchControlValue('currentFolderId', null);
    this.patchControlValue('currentCategoryId', this.activeCategory?.id ?? null);
  }

  private clearValues(): void {
    this.activeCategory = null;
    this.activeFolder = null;
    this.currentFoldersList = null;
  }

  private patchControlValue(controlName: string, value: any): void {
    const control = this.form.controls[controlName];
    if (control) {
      control.patchValue(value);
    }
  }

}
