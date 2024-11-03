import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { Todo } from '../../common/models/todo.model';
import { CdkDragEnd, CdkDragStart, Point, CdkDrag } from '@angular/cdk/drag-drop';
import { Folder } from '../../common/models/folder.model';
import { Category } from '../../common/models/category.model';
import { SwipeService } from '../../common/services/swipe.service';
import { TPriority } from '../../common/models/priority.model';
import { Subscription } from 'rxjs';
import { SwipeComponentConfig, SwipeComponentStyles, STYLESLIST } from '../../common/models/swipe-items.model';
import { ConnectedPosition, CdkOverlayOrigin, CdkConnectedOverlay } from '@angular/cdk/overlay';
import { SvgIconComponent } from 'angular-svg-icon';
import { PriorityComponent } from '../priority/priority.component';


interface Position {
  x: number,
  y: number,
}

@Component({
  selector: 'app-swipe',
  templateUrl: './swipe.component.html',
  styleUrls: ['./swipe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CdkDrag, CdkOverlayOrigin, SvgIconComponent, CdkConnectedOverlay, PriorityComponent]
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

  isPriorityBarOpen: boolean = false;
  setPosition: Position = { x: 0, y: 0 };
  dragArea!: CdkDragEnd;

  config: SwipeComponentConfig = {
    priorityType: "none",
    iconsColor: '#676127',
    offsetY: 140
  }

  cdkConnectedOverlayPositions: ConnectedPosition = {
    originX: 'start',
    originY: 'center',
    overlayX: 'center',
    overlayY: 'center',
    offsetY: this.config.offsetY,
    offsetX: -44,
  }

  style!: SwipeComponentStyles;
  sub!: Subscription;

  constructor(
    private swipeService: SwipeService
  ) { }

  // need ref
  ngOnChanges(changes: SimpleChanges): void {
    if (this.todo) {
      this.config = this.swipeService.setPriorityBarY(this.todo.priority);
      this.cdkConnectedOverlayPositions.offsetY = this.config.offsetY;
    }
  }

  ngOnInit(): void {
    this.setClasses();

    this.sub = this.swipeService.closeAll.subscribe((isOpen: boolean) => {
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

  public changePriority(value: TPriority): void {
    this.isPriorityBarOpen = false;
    this.swipeService.changePriority(this.todo, value);
  }

  private setClasses(): void {
    if (this.todo) {
      this.style = STYLESLIST[0];
    } else if (this.folder) {
      this.style = STYLESLIST[1];
    } else if (this.category) {
      this.style = STYLESLIST[2];
    }
  }

}