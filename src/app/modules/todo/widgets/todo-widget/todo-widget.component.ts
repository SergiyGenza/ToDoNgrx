import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { TodoState } from '../../store/todo/todo.reducer';
import { TodoCategoryCreateAction, TodoCategoryFolderCreateAction, TodoCreateAction, TodoDeleteAction, TodoDeleteFolderAction, TodoDeleteFolderWithAllItemsAction, TodoEditAction, TodoToggleAction } from '../../store/todo/todo.actions';
import { categoriesListSelector, todoListSelector } from '../../store/todo/todo.selectors';
import { Observable } from 'rxjs';
import { Todo } from '../../models/todo.model';
import { LocalstorageService } from '../../services/localstorage.service';
import { ModalService } from 'src/app/modules/modal/services/modal.service';
import { Category } from '../../models/category.model';
import { CreateItem } from '../../models/create-item.model';

@Component({
  selector: 'app-todo-widget',
  templateUrl: './todo-widget.component.html',
  styleUrls: ['./todo-widget.component.scss']
})
export class TodoWidgetComponent implements OnInit {
  public todoList$: Observable<Todo[]>;
  public categoriesList$: Observable<Category[]>;
  public currentCategory: string;
  @ViewChild('modalTemplate', { static: true }) modalTemplate!: TemplateRef<any>;

  constructor(
    private todoStore$: Store<TodoState>,
    private modalServeice: ModalService,
    private localStorageService: LocalstorageService,
  ) {
    localStorageService.initTodos();
    this.currentCategory = localStorageService.loadCurrentCategoryFromStorage();
    this.todoList$ = this.todoStore$.pipe(select(todoListSelector));
    this.categoriesList$ = this.todoStore$.pipe(select(categoriesListSelector));
  }

  ngOnInit(): void {
  }

  // add category delete method
  // delete with or without content
  // add modal window

  public onItemCreate(createItem: CreateItem): void {
    const { name, type, currentFolderName, currentCategoryName } = createItem;
    switch (type) {
      case 'todo':
        return this.todoStore$.dispatch(new TodoCreateAction({ name, currentCategoryName, currentFolderName }));
      case 'folder':
        let categoryName = currentCategoryName;
        let folderName = name;
        return this.todoStore$.dispatch(new TodoCategoryFolderCreateAction({ categoryName, folderName }));
      case 'category':
        return this.todoStore$.dispatch(new TodoCategoryCreateAction({ name }));
    }
  }

  public onDelete(id: number): void {
    this.todoStore$.dispatch(new TodoDeleteAction({ id }));
  }

  public onFolderDelete({ id, name }: { id: number, name: string }): void {
    let option = this.modalServeice.open(this.modalTemplate, {
      size: 'lg',
      title: "Delete Folder",
      type: 'folderDelete'
    });
    option.subscribe(option => {
      option
        ? this.todoStore$.dispatch(new TodoDeleteFolderWithAllItemsAction({ id, name }))
        : this.todoStore$.dispatch(new TodoDeleteFolderAction({ id, name }))
    });
  }

  public onToggle(id: number): void {
    this.todoStore$.dispatch(new TodoToggleAction({ id }));
  }

  public onEdit({ id, name }: { id: number, name: string }): void {
    this.todoStore$.dispatch(new TodoEditAction({ id, name }));
  }

  public onCategoryPick(pickedCategory: string): void {
    this.currentCategory = pickedCategory;
    this.localStorageService.setCurrentCategoryInLocalstorage(pickedCategory);
  }
}
