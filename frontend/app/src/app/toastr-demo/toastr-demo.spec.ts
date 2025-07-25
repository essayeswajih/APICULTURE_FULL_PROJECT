import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastrDemo } from './toastr-demo';

describe('ToastrDemo', () => {
  let component: ToastrDemo;
  let fixture: ComponentFixture<ToastrDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastrDemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToastrDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
