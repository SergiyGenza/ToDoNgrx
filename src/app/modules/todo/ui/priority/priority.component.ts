import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Priority, TPriority } from '../../common/models/priority.model';

@Component({
  selector: 'app-priority',
  templateUrl: './priority.component.html',
  styleUrl: './priority.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PriorityComponent {
  @Input()
  priority: TPriority = "none";
  @Output()
  changePriority = new EventEmitter<TPriority>();
  @Output()
  cancelPriorityPick = new EventEmitter<void>();

  priorities: Priority[] = [{
    color: '#830000',
    priority: 'high'
  },
  {
    color: '#B58D00',
    priority: 'medium'
  },
  {
    color: '#7E6FD9',
    priority: 'low'
  },
  {
    color: '#676127',
    priority: 'none',
  }];

  public onPriorityChange(value: TPriority): void {
    this.changePriority.emit(value);
  }
}
