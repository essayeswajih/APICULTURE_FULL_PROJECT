import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BienfaitsduMiel } from './bienfaitsdu-miel';

describe('BienfaitsduMiel', () => {
  let component: BienfaitsduMiel;
  let fixture: ComponentFixture<BienfaitsduMiel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BienfaitsduMiel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BienfaitsduMiel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
