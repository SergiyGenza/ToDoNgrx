import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { TODO_REDUCER_NODE, todoReducer } from './store/todo/todo.reducer';
import { TodoPageComponent } from './pages/todo-page/todo-page.component';
import { RouterModule } from '@angular/router';
import { todoRoutes } from './todo.routes';
import { TodoWidgetComponent } from './widgets/todo-widget/todo-widget.component';
import { TodoCreateFormUiComponent } from './ui/todo-create-form-ui/todo-create-form-ui.component';
import { FormsModule } from '@angular/forms';
import { TodoListUiComponent } from './ui/todo-list-ui/todo-list-ui.component';
import { TodoListItemUiComponent } from './ui/todo-list-item-ui/todo-list-item-ui.component';
import { TodoListEditUiComponent } from './ui/todo-list-edit-ui/todo-list-edit-ui.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TodoHeaderBarUiComponent } from './ui/todo-header-bar-ui/todo-header-bar-ui.component';
import { ModalService } from '../modal/services/modal.service';
import { ModalModule } from '../modal/modal.module';
import { CategoryListItemUiComponent } from './ui/category-list-item-ui/category-list-item-ui.component';
import { CategoryFilterPipe } from './pipes/category-filter.pipe';


@NgModule({
  declarations: [
    TodoPageComponent,
    TodoWidgetComponent,
    TodoCreateFormUiComponent,
    TodoListUiComponent,
    TodoListItemUiComponent,
    TodoListEditUiComponent,
    TodoHeaderBarUiComponent,
    CategoryListItemUiComponent,
    CategoryFilterPipe,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(TODO_REDUCER_NODE, todoReducer),
    RouterModule.forChild(todoRoutes),
    FormsModule,
    DragDropModule,
    ModalModule
  ],
  exports: [
    TodoWidgetComponent
  ],
  providers: [
    ModalService,
  ]
})
export class TodoModule { }
