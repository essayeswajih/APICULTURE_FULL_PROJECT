import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestProducts } from './latest-products';

describe('LatestProducts', () => {
  let component: LatestProducts;
  let fixture: ComponentFixture<LatestProducts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LatestProducts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatestProducts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
