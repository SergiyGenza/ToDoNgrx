import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Category } from '../../common/models/category.model';
import { Todo } from '../../common/models/todo.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-list-item-ui',
  templateUrl: './category-list-item-ui.component.html',
  styleUrls: ['./category-list-item-ui.component.scss']
})
export class CategoryListItemUiComponent implements OnInit, OnChanges {
  @Input() currentCategory: string | undefined;
  @Input() category!: Category;
  @Input() todoList$: Observable<Todo[]> | undefined;
  @Output() deleteItem = new EventEmitter<number>();
  @Output() toggle = new EventEmitter<number>();
  @Output() edit = new EventEmitter<{ id: number, name: string }>();
  @Output() deleteFolder = new EventEmitter<{ id: number, name: string }>();

  public showContent: boolean = true;
  public showCreateComponent: boolean = false;
  public showHeader: boolean = false;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.checkCurrentCategory();
  }

  ngOnInit(): void {
  }

  public onDelete(id: number): void {
    console.log('onDelete', id);
    this.deleteItem.emit(id);
  }

  public onFolderDelete({ id, name }: { id: number, name: string }): void {
    console.log('onFolderDelete', id, name);
    this.deleteFolder.emit({ id, name });
  }

  public onToggle(id: number): void {
    console.log('works');
    this.toggle.emit(id);
  }

  public onEdit({ id, name }: { id: number, name: string }): void {
    this.edit.emit({ id, name });
  }

  private checkCurrentCategory(): void {
    this.showHeader = this.currentCategory !== 'all';
  }
}
