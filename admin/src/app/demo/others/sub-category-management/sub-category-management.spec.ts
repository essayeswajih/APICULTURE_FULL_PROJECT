import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategoryManagement } from './sub-category-management';

describe('SubCategoryManagement', () => {
  let component: SubCategoryManagement;
  let fixture: ComponentFixture<SubCategoryManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubCategoryManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubCategoryManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
