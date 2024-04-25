import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoCreateFormUiComponent } from './todo-create-form-ui.component';

describe('TodoCreateFormUiComponent', () => {
  let component: TodoCreateFormUiComponent;
  let fixture: ComponentFixture<TodoCreateFormUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoCreateFormUiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoCreateFormUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
