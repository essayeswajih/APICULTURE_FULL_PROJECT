import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Boutique } from './boutique';

describe('Boutique', () => {
  let component: Boutique;
  let fixture: ComponentFixture<Boutique>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Boutique]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Boutique);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
