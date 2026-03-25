import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDrawer } from './product-drawer';

describe('ProductDrawer', () => {
  let component: ProductDrawer;
  let fixture: ComponentFixture<ProductDrawer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDrawer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDrawer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
