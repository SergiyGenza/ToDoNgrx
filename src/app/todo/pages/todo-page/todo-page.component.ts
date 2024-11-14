import { Component } from '@angular/core';
import { TodoWidgetComponent } from '../../widgets/todo-widget/todo-widget.component';

@Component({
    selector: 'app-todo-page',
    templateUrl: './todo-page.component.html',
    styleUrls: ['./todo-page.component.scss'],
    standalone: true,
    imports: [TodoWidgetComponent]
})
export class TodoPageComponent {

}
