import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryListItemUiComponent } from './category-list-item-ui.component';

describe('CategoryListItemUiComponent', () => {
  let component: CategoryListItemUiComponent;
  let fixture: ComponentFixture<CategoryListItemUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryListItemUiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryListItemUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
