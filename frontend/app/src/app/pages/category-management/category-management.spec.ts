import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryManagement } from './category-management';

describe('CategoryManagement', () => {
  let component: CategoryManagement;
  let fixture: ComponentFixture<CategoryManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
