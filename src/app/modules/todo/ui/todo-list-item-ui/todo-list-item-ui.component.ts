import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Todo } from '../../common/models/todo.model';
import { SvgIconComponent } from 'angular-svg-icon';
import { SwipeComponentConfig, SWIPECOMPONENTCONFIGLIST } from '../../common/models/swipe-items.model';

@Component({
  selector: 'app-todo-list-item-ui',
  templateUrl: './todo-list-item-ui.component.html',
  styleUrls: ['./todo-list-item-ui.component.scss'],
  standalone: true,
  imports: [SvgIconComponent, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListItemUiComponent implements OnChanges {
  @Input()
  todo: Todo | undefined;
  @Output()
  toggle = new EventEmitter<void>();

  listClasses!: string[];
  config: SwipeComponentConfig | undefined;

  ngOnChanges(changes: SimpleChanges): void {
    this.listClasses = [this.todo?.priority!];
    this.config = SWIPECOMPONENTCONFIGLIST.find(i => i.priorityType === this.todo?.priority);
  }
}
