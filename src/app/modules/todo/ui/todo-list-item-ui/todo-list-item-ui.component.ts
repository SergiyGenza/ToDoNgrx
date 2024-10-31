import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Todo } from '../../common/models/todo.model';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
    selector: 'app-todo-list-item-ui',
    templateUrl: './todo-list-item-ui.component.html',
    styleUrls: ['./todo-list-item-ui.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [SvgIconComponent]
})
export class TodoListItemUiComponent implements OnChanges {
  @Input()
  todo: Todo | undefined;
  @Output()
  toggle = new EventEmitter<void>();

  listClasses!: string[];

  ngOnChanges(changes: SimpleChanges): void {
    this.listClasses = [this.todo?.priority!];
  }

}
