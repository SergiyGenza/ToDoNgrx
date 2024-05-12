import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { CdkDragEnd, Point } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-todo-list-ui',
  templateUrl: './todo-list-ui.component.html',
  styleUrls: ['./todo-list-ui.component.scss']
})
export class TodoListUiComponent {
  edits: number[] = [];
  setPosition = { x: 0, y: 0 };

  @Input() todoList: Todo[] | null = [];
  @Output() deleteItem = new EventEmitter<number>();
  @Output() toggle = new EventEmitter<number>();
  @Output() edit = new EventEmitter<{ id: number, name: string }>();


  public onEditMode(id: number) {
    this.edits.push(id);
  }

  public onToggle(id: number) {
    this.toggle.emit(id);
  }

  public onDelete(id: number) {
    this.deleteItem.emit(id);
  }

  public onEdit(name: string, id: number) {
    this.edits = this.edits.filter(item => item !== id);
    this.edit.emit({ id, name })
  }

  public dragEnd($event: CdkDragEnd, todo: Todo) {
    let pos: Point = $event.source.getFreeDragPosition();
    this.setPosition.x = pos.x;
    console.log(pos.x);
    console.log(this.setPosition.x);

    if (pos.x >= 45) {
      $event.source.reset();
      this.onEditMode(todo.id);
      console.log('onEdit');
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
      $event.source.reset();
      console.log('onDelete');
      this.onDelete(todo.id);

    }
    else if (20 > pos.x || pos.x > -20) {
      console.log('none');
      $event.source.reset();
      this.setPosition.x = 0;
    }
  }

}
