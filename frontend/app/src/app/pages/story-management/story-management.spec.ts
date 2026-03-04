import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryManagement } from './story-management';

describe('StoryManagement', () => {
  let component: StoryManagement;
  let fixture: ComponentFixture<StoryManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoryManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoryManagement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
