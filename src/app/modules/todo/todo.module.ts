import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { TODO_REDUCER_NODE, todoReducer } from './store/todo/todo.reducer';
import { TodoPageComponent } from './pages/todo-page/todo-page.component';
import { RouterModule } from '@angular/router';
import { todoRoutes } from './todo.routes';
import { TodoWidgetComponent } from './widgets/todo-widget/todo-widget.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoListUiComponent } from './ui/todo-list-ui/todo-list-ui.component';
import { TodoListItemUiComponent } from './ui/todo-list-item-ui/todo-list-item-ui.component';
import { TodoListEditUiComponent } from './ui/todo-list-edit-ui/todo-list-edit-ui.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TodoHeaderBarUiComponent } from './ui/todo-header-bar-ui/todo-header-bar-ui.component';
import { ModalService } from '../modal/services/modal.service';
import { ModalModule } from '../modal/modal.module';
import { CategoryListItemUiComponent } from './ui/category-list-item-ui/category-list-item-ui.component';
import { FolderListItemUiComponent } from './ui/folder-list-item-ui/folder-list-item-ui.component';
import { SwipeComponent } from './ui/swipe/swipe.component';
import { CategoryFilterPipe } from './common/pipes/category/category-filter.pipe';
import { CategoryService } from './common/services/category.service';
import { LocalstorageService } from './common/services/localstorage.service';
import { TodoPipe } from './common/pipes/todo/todo.pipe';
import { SharedModule } from '../shared/shared.module';
import { ActionsService } from './common/services/actions.service';
import { SwipeService } from './common/services/swipe.service';
import { PriorityComponent } from './ui/priority/priority.component';
import { OverlayModule } from "@angular/cdk/overlay";
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [
    TodoPageComponent,
    TodoWidgetComponent,
    TodoListUiComponent,
    TodoListItemUiComponent,
    TodoListEditUiComponent,
    TodoHeaderBarUiComponent,
    CategoryListItemUiComponent,
    CategoryFilterPipe,
    FolderListItemUiComponent,
    TodoPipe,
    SwipeComponent,
    PriorityComponent,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(TODO_REDUCER_NODE, todoReducer),
    RouterModule.forChild(todoRoutes),
    FormsModule,
    DragDropModule,
    OverlayModule,
    ModalModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    AngularSvgIconModule.forRoot()
  ],
  exports: [
    TodoWidgetComponent,
  ],
  providers: [
    ModalService,
    CategoryService,
    LocalstorageService,
    ActionsService,
    SwipeService
  ]
})
export class TodoModule { }
