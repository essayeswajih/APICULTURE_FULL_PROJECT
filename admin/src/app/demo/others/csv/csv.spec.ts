import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CSV } from './csv';

describe('CSV', () => {
  let component: CSV;
  let fixture: ComponentFixture<CSV>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CSV]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CSV);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
