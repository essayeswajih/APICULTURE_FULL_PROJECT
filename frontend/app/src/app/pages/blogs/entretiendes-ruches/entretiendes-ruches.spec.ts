import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntretiendesRuches } from './entretiendes-ruches';

describe('EntretiendesRuches', () => {
  let component: EntretiendesRuches;
  let fixture: ComponentFixture<EntretiendesRuches>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntretiendesRuches]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntretiendesRuches);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
