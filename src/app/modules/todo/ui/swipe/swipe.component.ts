import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../common/models/todo.model';
import { CdkDragEnd, Point } from '@angular/cdk/drag-drop';
import { Folder } from '../../common/models/folder.model';

@Component({
  selector: 'app-swipe',
  templateUrl: './swipe.component.html',
  styleUrls: ['./swipe.component.scss']
})
export class SwipeComponent {
  @Input() isEdit!: boolean;
  @Input() todo!: Todo;
  @Input() folder!: Folder;
  @Output() deleteItem = new EventEmitter<number>();
  @Output() openEditMode = new EventEmitter<Todo>();

  setPosition = { x: 0, y: 0 };

  public onEdit() {
    this.openEditMode.emit();
  }

  public onDelete(id: number) {
    this.deleteItem.emit(id);
  }

  // mb try derective
  public dragEnd($event: CdkDragEnd, todo: Todo) {
    let pos: Point = $event.source.getFreeDragPosition();
    this.setPosition.x = pos.x;
    console.log(pos.x);
    console.log(this.setPosition.x);

    if (pos.x >= 45) {
      this.onEdit();
      console.log('onEdit');
      $event.source.reset();
      this.setPosition.x = 0;
    }
    else if (pos.x >= 20 && pos.x <= 44) {
      console.log('priority');
      $event.source.reset();
    }
    else if (pos.x <= -20 && pos.x >= -44) {
      console.log('archive');
      $event.source.reset();
    }
    else if (pos.x <= -45) {
      this.setPosition.x = 0;
      console.log('onDelete');
      this.onDelete(todo.id);
      $event.source.reset();
    }
    else if (20 > pos.x || pos.x > -20) {
      console.log('none');
      this.setPosition.x = 0;
      $event.source.reset();
    }
  }
}
