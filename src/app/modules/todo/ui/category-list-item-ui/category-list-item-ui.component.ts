import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-category-list-item-ui',
  templateUrl: './category-list-item-ui.component.html',
  styleUrls: ['./category-list-item-ui.component.scss']
})
export class CategoryListItemUiComponent {
  @Input() category!: Category;
  @Output() folderCreate = new EventEmitter<{ folderName: string; categoryName: string; }>;

  public onFolderCreate(folderName: string, category = this.category) {
    let folderData = {
      folderName: folderName,
      categoryName: this.category.name
    }
    this.folderCreate.emit(folderData);
  }
}
