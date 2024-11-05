import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Todo } from '../../common/models/todo.model';
import { SvgIconComponent } from 'angular-svg-icon';
import { DatePipe } from '@angular/common';

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
  openInfo: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    this.listClasses = [this.todo?.priority!];
  }

}
