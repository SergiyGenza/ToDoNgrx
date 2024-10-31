import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { Category } from '../../common/models/category.model';
import { LocalstorageService } from '../../common/services/localstorage.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-todo-header-bar-ui',
  templateUrl: './todo-header-bar-ui.component.html',
  styleUrls: ['./todo-header-bar-ui.component.scss']
})
export class TodoHeaderBarUiComponent {
  @Input() categoriesList?: Category[] | null;
  @Input() currentCategory?: Category | null;
  @Output() currentCategoryEmmiter = new EventEmitter<Category | null>();

  constructor(
    private localStorageService: LocalstorageService,
    @Inject(DOCUMENT) private _document: Document
  ) { }

  public onCategoryPick(catagory: Category): void {
    this.currentCategory = catagory;
    this.currentCategoryEmmiter.emit(catagory);
  }

  public onAllCategoriesPick(): void {
    this.currentCategory = null;
    this.currentCategoryEmmiter.emit(null);
  }

  public clearAllData(): void {
    this.localStorageService.clearAllData();
    this._document.defaultView!.location.reload();
  }
}
