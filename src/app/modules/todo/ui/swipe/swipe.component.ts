import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { Todo } from '../../common/models/todo.model';
import { CdkDragEnd, CdkDragStart, Point } from '@angular/cdk/drag-drop';
import { Folder } from '../../common/models/folder.model';
import { Category } from '../../common/models/category.model';
import { SwipeService } from '../../common/services/swipe.service';
import { TPrority } from '../../common/models/priority.model';

interface Position {
  x: number,
  y: number,
}

@Component({
  selector: 'app-swipe',
  templateUrl: './swipe.component.html',
  styleUrls: ['./swipe.component.scss']
})
export class SwipeComponent {
  @Input() todo!: Todo;
  @Input() folder!: Folder;
  @Input() category!: Category;

  @ViewChild('modalTemplate', { static: true }) modalTemplate!: TemplateRef<any>;

  setPosition: Position = { x: 0, y: 0 };
  isPriorityBarOpen: boolean = false;

  constructor(
    private swipeService: SwipeService,
  ) { }

  public dragStarted($event: CdkDragStart) {
    this.isPriorityBarOpen = false;
  }

  public dragEnd($event: CdkDragEnd): void {
    let pos: Point = $event.source.getFreeDragPosition();
    this.setPosition.x = pos.x;
    console.log(pos.x);
    console.log(this.setPosition.x);

    this.swipeService.swipe(
      $event,
      this.modalTemplate,
      {
        todo: this.todo,
        folder: this.folder,
        category: this.category,
      });

    this.isPriorityBarOpen = this.swipeService.isPriorityBarOpen;
  }

  public changePriority(value: TPrority): void {
    this.isPriorityBarOpen = false;
    this.swipeService.changePriority(this.todo, value);
  }
}
