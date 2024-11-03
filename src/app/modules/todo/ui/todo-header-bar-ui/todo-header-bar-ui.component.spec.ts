import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoHeaderBarUiComponent } from './todo-header-bar-ui.component';

describe('TodoHeaderBarUiComponent', () => {
  let component: TodoHeaderBarUiComponent;
  let fixture: ComponentFixture<TodoHeaderBarUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [TodoHeaderBarUiComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(TodoHeaderBarUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
