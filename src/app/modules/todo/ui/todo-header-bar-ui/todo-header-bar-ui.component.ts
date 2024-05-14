import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { ModalService } from 'src/app/modules/modal/services/modal.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-todo-header-bar-ui',
  templateUrl: './todo-header-bar-ui.component.html',
  styleUrls: ['./todo-header-bar-ui.component.scss']
})
export class TodoHeaderBarUiComponent {
  @Input() categoriesList?: Category[] | null;
  @Output() createCategory = new EventEmitter<string | null>();

  constructor(
    private modalServeice: ModalService,
  ) { }

  public onCategoryCreate(modalTemplate: TemplateRef<any>) {
    this.modalServeice.open(modalTemplate, { size: 'lg', title: 'Add new catagory', type: 'form' }).subscribe((action: any) => {
      if (action) {
        this.createCategory.emit(action);
      }
    })
  }

  public onAllCategoriesPick() {

  }
}
