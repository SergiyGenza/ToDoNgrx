import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { TodoState } from '../../store/todo/todo.reducer';
import { TodoCategoryCreateAction, TodoCategoryFolderCreateAction, TodoCreateAction, TodoDeleteAction, TodoDeleteFolderAction, TodoDeleteFolderWithAllItemsAction, TodoEditAction, TodoEditFolderAction, TodoToggleAction } from '../../store/todo/todo.actions';
import { categoriesListSelector, todoListSelector } from '../../store/todo/todo.selectors';
import { Observable } from 'rxjs';
import { Todo } from '../../common/models/todo.model';
import { ModalService } from 'src/app/modules/modal/services/modal.service';
import { Category } from '../../common/models/category.model';
import { CreateItem } from '../../common/models/create-item.model';
import { LocalstorageService } from '../../common/services/localstorage.service';
import { Folder } from '../../common/models/folder.model';

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

  ngOnInit(): void { }

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

  public onFolderEdit(folder: Folder): void {
    let option = this.modalServeice.open(this.modalTemplate, {
      size: 'lg',
      title: 'Edit Folder',
      type: 'folderEdit',
      folder: folder
    });
    option.subscribe(option => {
      const { id, name } = option;
      this.todoStore$.dispatch(new TodoEditFolderAction({ id, name }));
    });
  }

  public onFolderDelete({ id, name }: { id: number, name: string }): void {
    let option = this.modalServeice.open(this.modalTemplate, {
      size: 'lg',
      title: 'Delete Folder',
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

  public onItemEdit({ id, name }: { id: number, name: string }): void {
    this.todoStore$.dispatch(new TodoEditAction({ id, name }));
  }

  public onTodoItemEdit(todo: Todo) {
    let option = this.modalServeice.open(this.modalTemplate, {
      size: 'lg',
      title: 'Edit Todo',
      type: 'todoEdit',
      todo: todo
    });
    option.subscribe(option => {
      const { id, name } = option;
      this.todoStore$.dispatch(new TodoEditAction({ id, name }));
    });
  }

  public onCategoryPick(pickedCategory: string): void {
    this.currentCategory = pickedCategory;
    this.localStorageService.setCurrentCategoryInLocalstorage(pickedCategory);
  }
}
