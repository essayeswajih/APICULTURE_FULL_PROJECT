import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebuterenApiculture } from './debuteren-apiculture';

describe('DebuterenApiculture', () => {
  let component: DebuterenApiculture;
  let fixture: ComponentFixture<DebuterenApiculture>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebuterenApiculture]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebuterenApiculture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
