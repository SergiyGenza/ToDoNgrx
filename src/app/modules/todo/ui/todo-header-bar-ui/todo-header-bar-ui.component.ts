import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { ModalService } from 'src/app/modules/modal/services/modal.service';
import { Category } from '../../models/category.model';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-todo-header-bar-ui',
  templateUrl: './todo-header-bar-ui.component.html',
  styleUrls: ['./todo-header-bar-ui.component.scss']
})
export class TodoHeaderBarUiComponent {
  @Input() categoriesList?: Category[] | null;
  @Output() createCategory = new EventEmitter<string | null>();
  @Output() currentCategory = new EventEmitter<string>();

  constructor(
    private modalServeice: ModalService,
    private localStorageService: LocalstorageService,
  ) { }

  public onCategoryCreate(modalTemplate: TemplateRef<any>) {
    this.modalServeice.open(modalTemplate, { size: 'lg', title: 'Add new catagory', type: 'form' }).subscribe((action: any) => {
      if (action) {
        this.createCategory.emit(action);
      }
    })
  }

  public onCategoryPick(catagory: Category) {
    this.currentCategory.emit(catagory.name);
  }

  public onAllCategoriesPick() {
    this.currentCategory.emit('all');
  }
}
