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
  @Input() categoriesList!: Category[] | null;
  @Input() currentCategory?: Category | null;
  @Input() maxHeigth!: number;
  @Output() result = new EventEmitter<FormGroup>();

  public activeCategory?: Category | null = null;
  public activeFolder!: Folder | null;
  public currentFoldersList!: Folder[];

  constructor() { }

  ngOnInit(): void {
    this.activeCategory = this.currentCategory;
  }

  // need optimization
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentCategory']) {
      this.activeCategory = this.currentCategory;
    }
    this.clearControls()
    this.setDefaultData()
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
    this.form.controls['currentCategoryId'].patchValue(null);
  }

  public onCategotyPick(category: Category): void {
    this.activeCategory = category;
    this.activeFolder = null;
    this.currentFoldersList = category.foldersList;
    this.form.controls['currentCategoryId'].patchValue(category.id);
  }

  public onFolderPick(folder: Folder | null): void {
    if (folder) {
      this.activeFolder = folder;
      return this.form.controls['currentFolderId'].patchValue(folder.id);
    }
    this.activeFolder = null;
    return
  }

  // need to fix this
  public isFolderActive(folder: Folder): boolean {
    if (this.activeFolder) {
      return this.activeFolder!.id === folder.id
    }
    return false;
  }

  private setDefaultData(): void {
    if (this.form.controls['currentCategoryId']) {
      this.form.controls['currentCategoryId'].patchValue(this.activeCategory?.id);
    }
  }

  private clearControls(): void {
    if (this.form.controls['currentCategoryId']) {
      this.form.controls['currentCategoryId']!.patchValue(null);
    }
    if (this.form.controls['currentFolderId']) {
      this.form.controls['currentFolderId']!.patchValue(null);
    }
  }

}
