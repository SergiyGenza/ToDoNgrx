import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderListItemUiComponent } from './folder-list-item-ui.component';

describe('FolderListItemUiComponent', () => {
  let component: FolderListItemUiComponent;
  let fixture: ComponentFixture<FolderListItemUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [FolderListItemUiComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(FolderListItemUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
