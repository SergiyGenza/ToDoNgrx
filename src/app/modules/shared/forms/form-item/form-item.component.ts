import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Category } from 'src/app/modules/todo/common/models/category.model';
import { Folder } from 'src/app/modules/todo/common/models/folder.model';

@Component({
  selector: 'app-form-item',
  templateUrl: './form-item.component.html',
  styleUrl: './form-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormItemComponent implements OnChanges, OnInit {
  @Input() form!: FormGroup;
  @Input() placeholder!: string;
  @Input() categoriesList!: Category[] | null | undefined;
  @Input() currentCategory?: Category | null;
  @Input() maxHeigth!: number;
  @Output() result = new EventEmitter<FormGroup>();

  public activeCategory?: Category | null = null;
  public activeFolder!: Folder | null;
  public currentFoldersList!: Folder[] | null;

  constructor() { }

  ngOnInit(): void {
    this.activeCategory = this.currentCategory;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentCategory']) {
      this.activeCategory = this.currentCategory;
      this.currentFoldersList = this.activeCategory?.foldersList ?? null;
      this.clearControls();
      this.setDefaultData();
    }
  }

  public onSubmit() {
    if (this.form.valid) {
      this.result.emit(this.form);
      this.form.reset();
      this.activeCategory = null;
      this.activeFolder = null;
    }
  }

  public clearCategoryPick(): void {
    this.activeCategory = null;
    this.activeFolder = null;
    this.currentFoldersList = null
    this.patchControlValue('currentCategoryId', null);
  }

  public onCategotyPick(category: Category): void {
    this.activeCategory = category;
    this.activeFolder = null;
    this.currentFoldersList = category.foldersList;
    this.patchControlValue('currentCategoryId', category.id);
  }

  public onFolderPick(folder: Folder | null): void {
    this.activeFolder = folder;
    this.patchControlValue('currentFolderId', folder?.id ?? null);
  }

  public isFolderActive(folder: Folder): boolean {
    return this.activeFolder?.id === folder.id || false;
  }

  private setDefaultData(): void {
    this.patchControlValue('currentCategoryId', this.activeCategory?.id ?? null);
  }

  private clearControls(): void {
    this.patchControlValue('currentCategoryId', null);
    this.patchControlValue('currentFolderId', null);
  }

  private patchControlValue(controlName: string, value: any): void {
    const control = this.form.controls[controlName];
    if (control) {
      control.patchValue(value);
    }
  }

}
