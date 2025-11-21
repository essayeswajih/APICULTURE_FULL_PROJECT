import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularProducts } from './popular-products';

describe('PopularProducts', () => {
  let component: PopularProducts;
  let fixture: ComponentFixture<PopularProducts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopularProducts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopularProducts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
