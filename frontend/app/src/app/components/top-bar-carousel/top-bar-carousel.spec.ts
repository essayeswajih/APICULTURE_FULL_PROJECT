import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBarCarousel } from './top-bar-carousel';

describe('TopBarCarousel', () => {
  let component: TopBarCarousel;
  let fixture: ComponentFixture<TopBarCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopBarCarousel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopBarCarousel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
