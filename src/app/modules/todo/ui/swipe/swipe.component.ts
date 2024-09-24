import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { Todo } from '../../common/models/todo.model';
import { CdkDragEnd, CdkDragStart, Point } from '@angular/cdk/drag-drop';
import { Folder } from '../../common/models/folder.model';
import { Category } from '../../common/models/category.model';
import { SwipeService } from '../../common/services/swipe.service';
import { TPrority } from '../../common/models/priority.model';
import { Subscription } from 'rxjs';

interface Position {
  x: number,
  y: number,
}

@Component({
  selector: 'app-swipe',
  templateUrl: './swipe.component.html',
  styleUrls: ['./swipe.component.scss']
})
export class SwipeComponent implements OnInit, OnDestroy, OnChanges {
  @Input()
  todo!: Todo;
  @Input()
  folder!: Folder;
  @Input()
  category!: Category;

  @ViewChild
    ('modalTemplate', { static: true }) modalTemplate!: TemplateRef<any>;

  setPosition: Position = { x: 0, y: 0 };
  isPriorityBarOpen: boolean = false;

  sub!: Subscription;

  dragArea!: CdkDragEnd;

  offsetX!: number
  offsetY!: number

  constructor(
    private swipeService: SwipeService,

  ) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.todo) {
      this.offsetY = this.setPriorityBarY();
      console.log(this.offsetY);
    }
  }

  ngOnInit(): void {
    this.sub = this.swipeService.closeAll.subscribe(isOpen => {
      if (!isOpen && this.dragArea) {
        this.dragArea.source.reset();
      }
      this.isPriorityBarOpen = isOpen;
    })

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public dragStarted($event: CdkDragStart) {
    this.swipeService.isPriorityBarOpen = false;
    this.isPriorityBarOpen = false;
  }

  public dragEnd($event: CdkDragEnd): void {
    this.dragArea = $event;

    let pos: Point = $event.source.getFreeDragPosition();
    this.setPosition.x = pos.x;
    console.log(pos.x);

    this.swipeService.swipe(
      $event,
      this.modalTemplate,
      {
        todo: this.todo,
        folder: this.folder,
        category: this.category,
      }
    );

    if (this.swipeService.isPriorityBarOpen) {
      this.isPriorityBarOpen = this.swipeService.isPriorityBarOpen;
    }
  }

  public changePriority(value: TPrority): void {
    this.isPriorityBarOpen = false;
    this.swipeService.changePriority(this.todo, value);
  }

  private setPriorityBarY(): number {
    switch (this.todo.priority) {
      case ('high'):
        return -19;
      case ('medium'):
        return -63;
      case ('low'):
        return -107;
      case ('none'):
        return -151;
      default:
        return 0;
    }
  }


}
