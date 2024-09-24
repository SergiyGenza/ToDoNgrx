import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { TPrority } from '../../common/models/priority.model';

@Component({
  selector: 'app-priority',
  templateUrl: './priority.component.html',
  styleUrl: './priority.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PriorityComponent {
  @Output()
  changePriority = new EventEmitter<TPrority>();
  @Output()
  cancelPriorityPick = new EventEmitter<void>();

  public onPriorityChange(value: TPrority): void {
    this.changePriority.emit(value);
  }
}
