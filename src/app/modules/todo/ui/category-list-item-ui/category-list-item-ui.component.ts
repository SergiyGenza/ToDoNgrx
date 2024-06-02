import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { Category } from '../../models/category.model';
import { Store } from '@ngrx/store';
import { TodoState } from '../../store/todo/todo.reducer';
import { TodoDeleteAction, TodoToggleAction, TodoEditAction } from '../../store/todo/todo.actions';
import { Todo } from '../../models/todo.model';
import { Observable } from 'rxjs';
import { ModalService } from 'src/app/modules/modal/services/modal.service';

@Component({
  selector: 'app-category-list-item-ui',
  templateUrl: './category-list-item-ui.component.html',
  styleUrls: ['./category-list-item-ui.component.scss']
})
export class CategoryListItemUiComponent {
  showContent: boolean = true;
  showCreateComponent: boolean = false;

  @Input() category!: Category;
  @Input() todoList$: Observable<Todo[]> | undefined;
  @Output() folderCreate = new EventEmitter<{ folderName: string; categoryName: string; }>;
  // @Output() 


  constructor(
    private todoStore$: Store<TodoState>,
    private modalServeice: ModalService,
  ) { }

  public onFolderCreate(modalTemplate: TemplateRef<any>): void {
    this.modalServeice.open(modalTemplate, { size: 'lg', title: 'Create new folder', type: 'form' }).subscribe((action: any) => {
      if (action) {
        let folderData = {
          folderName: action,
          categoryName: this.category.name
        }
        this.folderCreate.emit(folderData);
      }
    })
  }

  public onDelete(id: number): void {
    this.todoStore$.dispatch(new TodoDeleteAction({ id }));
  }

  public onToggle(id: number): void {
    this.todoStore$.dispatch(new TodoToggleAction({ id }));
  }

  public onEdit({ id, name }: { id: number, name: string }): void {
    this.todoStore$.dispatch(new TodoEditAction({ id, name }));
  }
}
