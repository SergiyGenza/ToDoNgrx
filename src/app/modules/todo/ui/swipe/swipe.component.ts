import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { Todo } from '../../common/models/todo.model';
import { CdkDragEnd, Point } from '@angular/cdk/drag-drop';
import { Folder } from '../../common/models/folder.model';
import { Category } from '../../common/models/category.model';
import { SwipeService } from '../../common/services/swipe.service';

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

  constructor(
    private swipeService: SwipeService,
  ) { }

  public dragEnd($event: CdkDragEnd): void {
    let pos: Point = $event.source.getFreeDragPosition();
    this.setPosition.x = pos.x;
    console.log(pos.x);
    console.log(this.setPosition.x);

    this.swipeService.swipe(
      pos.x,
      this.modalTemplate,
      {
        todo: this.todo,
        folder: this.folder,
        category: this.category,
      });

    $event.source.reset();
    this.setPosition.x = 0;
  }
}
