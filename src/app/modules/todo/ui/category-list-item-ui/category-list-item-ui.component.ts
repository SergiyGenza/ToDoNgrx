import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from '../../models/category.model';
import { Store } from '@ngrx/store';
import { TodoState } from '../../store/todo/todo.reducer';
import { TodoDeleteAction, TodoToggleAction, TodoEditAction } from '../../store/todo/todo.actions';
import { Todo } from '../../models/todo.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-list-item-ui',
  templateUrl: './category-list-item-ui.component.html',
  styleUrls: ['./category-list-item-ui.component.scss']
})
export class CategoryListItemUiComponent implements OnInit {
  @Input() currentCategory: string | undefined;
  @Input() category!: Category;
  @Input() todoList$: Observable<Todo[]> | undefined;
  @Output() folderCreate = new EventEmitter<{ folderName: string; categoryName: string; }>;

  showContent: boolean = true;
  showCreateComponent: boolean = false;
  showHeader: boolean = false;

  constructor(
    private todoStore$: Store<TodoState>,
  ) { }

  ngOnInit(): void {
    this.checkCurrentCategory();
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

  private checkCurrentCategory(): void {
    this.showHeader = this.currentCategory !== 'all';
  }
}
