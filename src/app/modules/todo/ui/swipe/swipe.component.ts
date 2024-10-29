import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { Todo } from '../../common/models/todo.model';
import { CdkDragEnd, CdkDragStart, Point } from '@angular/cdk/drag-drop';
import { Folder } from '../../common/models/folder.model';
import { Category } from '../../common/models/category.model';
import { SwipeService } from '../../common/services/swipe.service';
import { TPriority } from '../../common/models/priority.model';
import { Subscription } from 'rxjs';
import { SwipeComponentStyles, stylesList } from '../../common/models/swipe-component-styles';


interface Position {
  x: number,
  y: number,
}

@Component({
  selector: 'app-swipe',
  templateUrl: './swipe.component.html',
  styleUrls: ['./swipe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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

  sub!: Subscription;

  isPriorityBarOpen: boolean = false;
  setPosition: Position = { x: 0, y: 0 };
  dragArea!: CdkDragEnd;
  offsetX!: number;
  offsetY!: number;

  priorityType: TPriority = "none";
  style!: SwipeComponentStyles;
  iconsColor: string = '#676127';

  constructor(
    private swipeService: SwipeService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.todo) {
      this.setPriorityBarY();
    }
  }

  ngOnInit(): void {
    this.setClasses();

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

  public changePriority(value: TPriority): void {
    this.isPriorityBarOpen = false;
    this.swipeService.changePriority(this.todo, value);
  }

  private setPriorityBarY(): void {
    switch (this.todo.priority) {
      case ('high'):
        this.priorityType = 'high';
        this.iconsColor = '#830000';
        this.offsetY = -20;
        break
      case ('medium'):
        this.priorityType = 'medium';
        this.iconsColor = '#B58D00';
        this.offsetY = -60;
        break
      case ('low'):
        this.priorityType = 'low';
        this.iconsColor = '#7E6FD9';
        this.offsetY = -100;
        break
      case ('none'):
        this.priorityType = 'none';
        this.iconsColor = '#676127';
        this.offsetY = -140;
        break
      default:
        this.offsetY = -140;
    }
  }

  private setClasses(): void {
    if (this.todo) {
      this.style = stylesList[0];
    } else if (this.folder) {
      this.style = stylesList[1];
    } else if (this.category) {
      this.style = stylesList[2];
    }
  }

}
