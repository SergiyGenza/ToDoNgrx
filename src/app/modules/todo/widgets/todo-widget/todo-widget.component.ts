import { Component, OnInit, TemplateRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { TodoState } from '../../store/todo/todo.reducer';
import { TodoCategoryCreateAction, TodoCategoryFolderCreateAction, TodoCreateAction, TodoDeleteAction, TodoEditAction, TodoToggleAction } from '../../store/todo/todo.actions';
import { categoriesListSelector, todoListSelector } from '../../store/todo/todo.selectors';
import { Observable } from 'rxjs';
import { Todo } from '../../models/todo.model';
import { LocalstorageService } from '../../services/localstorage.service';
import { ModalService } from 'src/app/modules/modal/services/modal.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-todo-widget',
  templateUrl: './todo-widget.component.html',
  styleUrls: ['./todo-widget.component.scss']
})
export class TodoWidgetComponent implements OnInit {
  todoList$: Observable<Todo[]> = this.todoStore$.pipe(select(todoListSelector));
  categoriesList$: Observable<Category[]> = this.todoStore$.pipe(select(categoriesListSelector));
  currentCategory: string;

  constructor(
    private todoStore$: Store<TodoState>,
    private modalServeice: ModalService,
    private localStorageService: LocalstorageService,
  ) {
    this.currentCategory = localStorageService.loadCurrentCategoryFromStorage();
    localStorageService.initTodos();
  }

  ngOnInit(): void {
    // this.todoList$.subscribe((item) => console.log(item))
    // this.categoriesList$.subscribe((item) => console.log(item))
  }

  // перенести це в сервіси, щоб не дублювати

  public onTodoCreate(name: string): void {
    let currentCategoryName = this.currentCategory;
    this.todoStore$.dispatch(new TodoCreateAction({ name, currentCategoryName }));
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

  public onCategoryCreate(name: string | null): void {
    console.log(name);
    if (name) {
      this.todoStore$.dispatch(new TodoCategoryCreateAction({ name }));
    }
  }

  public onFolderCreate(folder: { folderName: string; categoryName: string; }): void {
    const { folderName, categoryName } = folder;
    this.todoStore$.dispatch(new TodoCategoryFolderCreateAction({ categoryName, folderName }));
  }

  public onCategoryPick(pickedCategory: string): void {
    this.currentCategory = pickedCategory;
    this.localStorageService.setCurrentCategoryInLocalstorage(pickedCategory);
  }

  public openModal(modalTemplate: TemplateRef<any>): void {
    this.modalServeice.open(modalTemplate, { size: 'lg', title: 'title' }).subscribe((action: any) => {
      console.log('modalAction', action);
    })
  }
}
