import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
// import { ModalService } from 'src/app/modules/modal/services/modal.service';
import { Category } from '../../common/models/category.model';

@Component({
  selector: 'app-todo-header-bar-ui',
  templateUrl: './todo-header-bar-ui.component.html',
  styleUrls: ['./todo-header-bar-ui.component.scss']
})
export class TodoHeaderBarUiComponent {
  @Input() categoriesList?: Category[] | null;
  @Input() currentCategory?: string;
  // @Output() createCategory = new EventEmitter<string | null>();
  @Output() currentCategoryEmmiter = new EventEmitter<string>();


  constructor(
    // private modalServeice: ModalService,
  ) { }

  // public onCategoryCreate(modalTemplate: TemplateRef<any>) {
  //   this.modalServeice.open(modalTemplate, { size: 'lg', title: 'Add new catagory', type: 'form' }).subscribe((action: any) => {
  //     if (action) {
  //       this.createCategory.emit(action);
  //     }
  //   })
  // }

  public onCategoryPick(catagory: Category) {
    console.log();

    this.currentCategory = catagory.name;
    this.currentCategoryEmmiter.emit(catagory.name);
  }

  public onAllCategoriesPick() {
    this.currentCategory = 'all';
    this.currentCategoryEmmiter.emit('all');
  }
}
