import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TPriority } from '../../common/models/priority.model';

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
  
  priorities: TPriority[] = ['high', 'medium', 'low', 'none'];

  public onPriorityChange(value: TPriority): void {
    this.changePriority.emit(value);
  }
}
